import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit, OnDestroy {

  private user: User;
  form: FormGroup;
  sign: string;
  mySubscription: Subscription = new Subscription();

  constructor(
    private _routerInfo: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.sign = this._userService.currentTargetUser ? this._userService.currentTargetUser._id : '';
    this.form = this.fb.group({
      first_name: [this._userService.currentTargetUser ? this._userService.currentTargetUser.first_name : ''],
      last_name: [this._userService.currentTargetUser ? this._userService.currentTargetUser.last_name : ''],
      email: [this._userService.currentTargetUser ? this._userService.currentTargetUser.email : ''],
      password: ['']
    });
  }

  cancel() {
    this._router.navigateByUrl('/users');
  }

  save() {
    this.mySubscription.add(
      this._userService.create(this.form.value).subscribe(
        response => {
          if (JSON.stringify(response.success) === 'true') {
            this._router.navigateByUrl('/users');
          }
        }
      )
    );
  }

  updateForm() {
    this.mySubscription.add(
      this._userService.update({
        _id: this._userService.currentTargetUser._id,
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        email: this.form.value.email
      }).subscribe(response => {if (JSON.stringify(response) === 'true') {
        this._router.navigateByUrl('/users');
      }})
    );
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}
