import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const _cookie = inject(CookieService);
  const _router = inject(Router);


  if(!!_cookie.get('token')){
    return true ;
  }else{
    _router.navigate(['/login']);
    return false ;
  }




};
