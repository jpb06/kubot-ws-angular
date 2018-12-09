import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base/base.api.service';
import { StarSystem } from 'src/types/api/star.system';

@Injectable()
export class StaticDataService extends BaseApiService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  async getStarSystems(): Promise<Array<StarSystem>> {

    let result = await this.http.post<any>(`${this.host}/api/static/systems`, {}).toPromise();
    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return result.data as Array<StarSystem>;
  }
}
