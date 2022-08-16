import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  static genRandomNum(min: number, max: number) {
    return Math.trunc(Math.random() * (max - min) + min);
  }
}
