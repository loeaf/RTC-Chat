import { TestBed } from '@angular/core/testing';

import { HttpInterceptorServiceInterceptor } from './http-interceptor-service.interceptor';

describe('HttpInterceptorServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptorServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorServiceInterceptor = TestBed.inject(HttpInterceptorServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
