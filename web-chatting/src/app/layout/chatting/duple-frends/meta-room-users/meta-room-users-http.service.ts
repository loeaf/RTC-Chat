import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Frend, MetaRoomFrend} from '../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class MetaRoomUsersHttpService {

  constructor(private httpClient: HttpClient) { }

  getUserByMetaRoomHttp(roomId: number): Promise<MetaRoomFrend[] | undefined> {
    return lastValueFrom(this.httpClient.get<MetaRoomFrend[]>(
      `${environment.apiServerUrl}/meta-room/${roomId}`
    ));
  }
}
