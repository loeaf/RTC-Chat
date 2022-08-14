import { Injectable } from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {environment} from '../../../../../../../environments/environment';
import {User} from '../../../user/user-http.service';
import {HttpClient} from '@angular/common/http';
import {Frend, Frends} from '../../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class FrendAcceptPopupHttpService {

  constructor(private httpClient: HttpClient) { }
  getRecoFrends(userId: string): Promise<Frends | undefined> {
    return lastValueFrom(this.httpClient.get<Frends>(
      `${environment.apiServerUrl}/frends/${userId}`
    ));
  }
  getRecoFrendsToMe(userId: string): Promise<Frends | undefined> {
    return lastValueFrom(this.httpClient.get<Frends>(
      `${environment.apiServerUrl}/frends/accept-list/${userId}`
    ));
  }
  postRecoFrends(frend: Frend): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.post<Frend>(
      `${environment.apiServerUrl}/frends`,frend
    ));
  }
  patchRecoFrends(userId: string, frend: Frend): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.patch<Frend>(
      `${environment.apiServerUrl}/frends/${userId}`, frend
    ));
  }
  deleteRecoFrends(frend: Frend): Promise<Frend | undefined> {
    return lastValueFrom(this.httpClient.delete<Frend>(
      `${environment.apiServerUrl}/frends?userId=${frend.userId}&frendId=${frend.frendId}`
    ));
  }
}
