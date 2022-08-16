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
    const localstgVal = localStorage.getItem("token_value");
    debugger;
    if(localstgVal !== null) {
      const parseBarrier = localstgVal.split(' ')[1];
      const auth: User = JSON.parse(parseBarrier);
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
        // alert(e.error.error.message);
        console.log('에러가 있다')
        return throwError(e);
      })
    )
  }
}
