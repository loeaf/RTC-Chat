import { Injectable } from '@angular/core';
const io = require('socket.io-client');
import {Observable, Subject, Subscriber} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInteractiveService {

  constructor() { }
}
