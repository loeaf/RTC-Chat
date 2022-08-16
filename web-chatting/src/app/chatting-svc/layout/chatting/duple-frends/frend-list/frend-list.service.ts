import {EventEmitter, Injectable, Output} from '@angular/core';
import {Frends} from '../../invite-frends/frend-http.service';

@Injectable({
  providedIn: 'root'
})
export class FrendListService {
  frends: Frends = {
    frends: []
  };
  @Output()
  renderFrendListEvt = new EventEmitter<Frends>();

  constructor() { }
}
