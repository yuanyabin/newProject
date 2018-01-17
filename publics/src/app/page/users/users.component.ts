import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { LogOutService } from '../page.service';

import 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  private users: Array<User> = [];
  mySubscription: Subscription = new Subscription();
  private searchValue: string;
  private searchResult: Array<User> = [];
  private searchResultShow: Array<User> = [];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _LogOutService: LogOutService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  onClickItem() {
    if (!this.searchValue) {
      this.searchResult = [];
    }else {
      return;
    }
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response && typeof(response) === 'object') {
          this.users = response;
          this.users.forEach(function(value, index, array) {
            array[index].index = index + 1;
          });
        }
      }
    );
  }

  search() {
    const _this = this;
    this.searchResult = [];
    if (_this.users) {
      _this.users.forEach(function(value, index, array) {
        if (value.first_name.toLowerCase() === _this.searchValue.toLowerCase()) {
          _this.searchResult.push(array[index]);
        }
      });
    }
  }

  create() {
    this._userService.currentTargetUser = '';
    this._router.navigateByUrl('/page/users/0');
  }

  destroy(user: User) {
    this._userService.destroy(user).subscribe(
      response => {
        if (JSON.stringify(response) === 'true') {
          this.getUsers();
        }
      }
    );
  }

  update(user: User) {
      this._userService.currentTargetUser = user;
      this._router.navigateByUrl('/page/users/' + user._id);
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}

