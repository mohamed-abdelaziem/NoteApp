import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { handleLoaderInterceptor } from './core/interceptors/handle-loader-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headerWithTokenInterceptor } from './core/interceptors/header-with-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch() , withInterceptors([handleLoaderInterceptor , headerWithTokenInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withHashLocation())
  ]
};
