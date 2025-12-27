import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerWithTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const _cookie = inject(CookieService);

  req = req.clone({setHeaders : {
    token : _cookie.get('token')  || ""
  }})

  return next(req);
};
