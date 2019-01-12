import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuildConfiguration } from './../../types/api/guild';
import { BaseApiService } from './base/base.api.service';
import { WatchedFaction } from '../../types/api/watched.faction';
import { WatchedRegion } from 'src/types/api/watched.region';

@Injectable()
export class KubotService extends BaseApiService {
  
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  async getGuild(id: string): Promise<GuildConfiguration> {
    let result = await this.http.post<any>(`${this.host}/kubot/guild`, {
      id: id
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return result.data as GuildConfiguration;
  }

  async saveGuildSettings(guild: GuildConfiguration): Promise<boolean> {
    let result = await this.http.post<any>(`${this.host}/kubot/saveguild`, {
      guild: guild
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return true;
  }

  async getFactions(id: string): Promise<Array<WatchedFaction>> {
    let result = await this.http.post<any>(`${this.host}/kubot/factions`, {
      id: id
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return result.data as Array<WatchedFaction>;
  }

  async saveFactions(
    id: string,
    factions: Array<WatchedFaction>
  ): Promise<boolean> {
    let result = await this.http.post<any>(`${this.host}/kubot/savefactions`, {
      id: id,
      factions: factions
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return true;
  }

  async getRegions(id: string): Promise<Array<WatchedRegion>> {
    let result = await this.http.post<any>(`${this.host}/kubot/regions`, {
      id: id
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return result.data as Array<WatchedRegion>;
  }

  async saveRegions(
    id: string,
    regions: Array<WatchedRegion>
  ): Promise<boolean> {
    let result = await this.http.post<any>(`${this.host}/kubot/saveregions`, {
      id: id,
      regions: regions
    }).toPromise();

    if (result.status !== 200) {
      throw new Error(result.status);
    }

    return true;
  }
}
