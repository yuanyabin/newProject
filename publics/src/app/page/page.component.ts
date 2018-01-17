import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  currentUser: string;

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.navigateByUrl('/page/users');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  layout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this._router.navigateByUrl('/login');
    }
  }

}
