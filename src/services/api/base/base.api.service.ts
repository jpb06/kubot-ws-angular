import { environment } from './../../../environments/environment';

export class BaseApiService {
  protected host: string;

  constructor() {
    if (environment.production) {
      this.host = 'https://kubot.cf/api';
    } else {
      this.host = 'http://localhost:3000/api';
    }
   
  }
}
