import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {User} from '../layout/chatting/user/user-http.service';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request: HttpRequest<any>;
    const auth: User = JSON.parse(localStorage.getItem("token_value"));
    console.log(auth);
    if(auth !== undefined) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.id}`
        }
      });
    } else {
      request = req;
    }
    return next.handle(request).pipe(
      catchError(e => {
        /**
         * 여기서 Error 원하는 방식으로 에러를 처리하자
         */
        alert(e.error.error.message);
        return throwError(e);
      })
    )
  }
}
