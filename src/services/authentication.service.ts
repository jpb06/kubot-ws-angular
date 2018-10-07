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
