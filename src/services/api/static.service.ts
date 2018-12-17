import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base/base.api.service';
import { StarSystem } from 'src/types/api/star.system';
import * as moment from 'moment';

@Injectable()
export class StaticDataService extends BaseApiService {

  private starSystemsLastCall: moment.Moment;
  private starSystems: Array<StarSystem>;

  constructor(
    private http: HttpClient
  ) {
    super();
    this.starSystemsLastCall = moment("1900-01-01");
    this.starSystems = [];
  }

  async getStarSystems(): Promise<Array<StarSystem>> {

    if (this.starSystemsLastCall.add(3, 'm').isBefore(moment())) {

      let result = await this.http.post<any>(`${this.host}/api/static/systems`, {}).toPromise();
      if (result.status !== 200) {
        throw new Error(result.status);
      }

      this.starSystems = result as Array<StarSystem>;
      this.starSystemsLastCall = moment();
    }

    return this.starSystems;
  }
}
