import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient {
    constructor(private _http: Http, private _router: Router) { }

    createAuthorizationHeader(headers: Headers) {
        if (localStorage.getItem('currentUser')) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;

            if (token) {
                headers.append('Authorization', token);
            }else {
                this._router.navigateByUrl('/login');
            }
        } else {
            this._router.navigateByUrl('/login');
        }
    }

    // 封装get方法
    get(url, data?): Observable<Response> {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, { headers: headers, params: data });
    }

    // 封装post方法
    post(url, data): Observable<Response> {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.post(url, data, { headers: headers });
    }

    // 封装put方法
    put(url, data): Observable<Response> {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.put(url, data, { headers: headers });
    }

    // 封装delete方法
    delete(url): Observable<Response> {
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.delete(url, { headers: headers });
    }
}
