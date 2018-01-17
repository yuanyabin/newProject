// import { Http, Headers } from '@angular/http';
import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '../shared/custom-http.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs';
import 'rxjs/Rx';
import { error } from 'util';

@Injectable()
export class UserService {

  constructor(private _router: Router, private _http: HttpClient) { }

  currentTargetUser: any;

  returnLoginPage(options) {
    let getErrorValue: string;
    switch (options.status) {
      case 401:
      getErrorValue = '未登录';
      this._router.navigateByUrl('/login');
      break;
      // 其他情况留给你了
      default:
        break;
    }
  }

  getUsers() {
    return this._http.get('/api/users').map(
      res => res.json()
    ).catch( error => {
      this.returnLoginPage(error);
      return 'not-login';
    });
  }

  getUser(user: User) {
    return this._http.get('/api/users').map(
      res => res.json()
    ).catch( error => {
      this.returnLoginPage(error);
      return 'not-login';
    });
  }

  create(user: User) {
    return this._http.post('/api/users', user).map(
      res => res.json()
    ).catch(error => {
      this.returnLoginPage(error);
      return 'not-login';
    });
  }

  destroy(user: User) {
    return this._http.post('/api/delete/users/', {id: user._id}).map(
      res => res.json()
    ).catch(error => {
      this.returnLoginPage(error);
      return 'not-login';
    });
  }

  update(user: User) {
    return this._http.put('/api/users', user).map(
      res => res.json()
    ).catch(error => {
      this.returnLoginPage(error);
      return 'not-login';
    });
  }

  login(user: User) {
    return this._http.post('/api/login', user).map(
      res => res.json()
    );
  }
}

