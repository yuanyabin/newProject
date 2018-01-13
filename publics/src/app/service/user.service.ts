import { Http, Headers } from '@angular/http';
import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  currentTargetUser: any;

  getUsers() {
    return this._http.get('/api/users').map(
      res => res.json()
    );
  }

  getUser(user: User) {
    return this._http.get('/api/users').map(
      res => res.json()
    );
  }

  create(user: User) {
    return this._http.post('/api/users', user).map(
      res => res.json()
    );
  }

  destroy(user: User) {
    return this._http.post('/api/delete/users/', {id: user._id}).map(
      res => res.json()
    );
  }

  update(user: User) {
    return this._http.put('/api/users', user).map(
      res => res.json()
    );
  }

}

