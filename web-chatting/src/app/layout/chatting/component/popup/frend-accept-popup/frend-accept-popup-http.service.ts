import { Injectable } from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {User} from '../../../user/user-http.service';
import {HttpClient} from '@angular/common/http';
import {Frend, Frends} from '../../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class FrendAcceptPopupHttpService {

  constructor(private httpClient: HttpClient) { }
  getRecoFrends(userId: string): Promise<Frends[] | undefined> {
    return lastValueFrom(this.httpClient.get<Frends[]>(
      `${environment.apiServerUrl}/frends?id=${userId}`
    ));
  }
  postRecoFrends(frend: Frend): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.post<Frend>(
      `${environment.apiServerUrl}/frends`,frend
    ));
  }
  patchRecoFrends(userId: string, frend: Frend): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.patch<Frend>(
      `${environment.apiServerUrl}/frends?id=${userId}`, frend
    ));
  }
  deleteRecoFrends(userId: string): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.delete<Frend>(
      `${environment.apiServerUrl}/frends?id=${userId}`
    ));
  }
}
