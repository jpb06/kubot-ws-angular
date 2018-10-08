import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  async login(guildId: string, password: string) {

    let req = await this.http.post<any>(`http://localhost:1337/api/ws/login`, { login: guildId, password: password }).toPromise();

    if (req && req.status === 'Success' && req.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const expiresAt = moment().add(req.expiresIn, 'second');

      localStorage.setItem('id_token', req.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    return true;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
