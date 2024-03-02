import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let updateObject: {};

    if (!!token) {
      updateObject = {
        url: environment.apiUrl + req.url,
        headers: req.headers.set('Authorization', `BEARER ${token}`),
      };
    } else {
      updateObject = {
        url: environment.apiUrl + req.url,
      };
    }

    const apiReq = req.clone(updateObject);

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(error.message);
        return throwError(() => error);
      }),
    );
  }
}
