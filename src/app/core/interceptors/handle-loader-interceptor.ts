import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const handleLoaderInterceptor: HttpInterceptorFn = (req, next) => {

  const _loaderService = inject(LoaderService);
  _loaderService.showLoader()

  return next(req).pipe(finalize(()=>{
    _loaderService.hideLoader();
  }));
};
