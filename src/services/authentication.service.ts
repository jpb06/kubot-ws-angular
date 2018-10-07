//import * as moment from "moment";
//import { Injectable } from "@angular/core";
//import { HttpClient } from '@angular/common/http';

//import { Observable } from 'rxjs';
//import { tap, shareReplay } from "rxjs/operators"; // tap replaces do now

//@Injectable()
//export class AuthenticationService {

//  constructor(private http: HttpClient) {

//  }

//  public login(guildId: string, password: string): Observable<Object> {
//    return this.http.post('http://localhost:1337/api/ws/login', {
//      login: guildId,
//      password: password
//    })
//      .pipe(
//        tap(res => this.setSession(res)),
//        shareReplay()
//      );
//  }

//  private setSession(authResult) {
//    const expiresAt = moment().add(authResult.expiresIn, 'second');

//    localStorage.setItem('id_token', authResult.token);
//    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
//  }

//  public logout() {
//    localStorage.removeItem("id_token");
//    localStorage.removeItem("expires_at");
//  }

//  public isLoggedIn() {
//    return moment().isBefore(this.getExpiration());
//  }

//  public isLoggedOut() {
//    return !this.isLoggedIn();
//  }

//  private getExpiration() {
//    const expiration = localStorage.getItem("expires_at");
//    const expiresAt = JSON.parse(expiration);
//    return moment(expiresAt);
//  }
//}

//---------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(guildId: string, password: string): Observable<boolean> {
    // ${config.apiUrl}
    return this.http.post<any>(`http://localhost:1337/api/ws/login`, { login: guildId, password: password })
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.status === 'success' && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const expiresAt = moment().add(data.expiresIn, 'second');

          localStorage.setItem('id_token', data.token);
          localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        }

        return true;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
