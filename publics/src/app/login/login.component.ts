import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { GverifyComponent } from './gverify/gverify.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  @ViewChild(GverifyComponent) child: GverifyComponent;

  constructor(private fb: FormBuilder, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitData() {
    let codeReust = false;
    if  (this.child.VerifiCode) {
      codeReust = this.child.getGaverifyService.validate(this.child.VerifiCode);
    }

    if (codeReust) {
      this.child.inValidError = false;
      this.child.inValidNull = true;
      this._userService.login(this.validateForm.value).subscribe(
        response => {
          if (JSON.stringify(response.success) === 'true') {
            localStorage.setItem('currentUser', JSON.stringify({ userName: response.name, token: response.token }));
            this._router.navigateByUrl('/users');
          }
        }
      );
      return;
    } else {
      for (const field of Object.keys(this.validateForm.controls)) {
        this.validateForm.controls[field].markAsDirty();
      }
      if (this.child.VerifiCode && !codeReust) {
        this.child.inValidError = true;
        if (this.child.inValidNull) {
          this.child.inValidNull = false;
        }
      }else if (!this.child.VerifiCode) {
        if (this.child.inValidError) {
          this.child.inValidError = false;
        }
        this.child.inValidNull = true;
        this.child.getGaverifyService.refresh();
      }
      return;
    }
  }

}
