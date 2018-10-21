export class BaseApiService {
  protected host: string;

  constructor() {
    this.host = 'http://localhost:1337';
  }
}
