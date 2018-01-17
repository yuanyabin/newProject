import { Injectable } from '@angular/core';

@Injectable()
export class LogOutService {
    public currentUser: any;
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    logOut(): void {
        localStorage.clear();
    }
}
