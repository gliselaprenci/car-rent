import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      deps: [ToastrService],
      multi: true,
    },
  ],
};
