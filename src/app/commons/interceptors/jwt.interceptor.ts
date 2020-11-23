import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { UtilAlert } from '../util/util.alert';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthenticationService,
    private _alert: UtilAlert
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((_: HttpEvent<any>) => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._alert.errorSwal('Su sesión ha finalizado');
            console.log('ERROR 401');
            this.auth.logout();
          }
          if (err.status === 403) {
            this._alert.errorSwal('No tienes Permisos para ejecutar esta operación');
            console.log('ERROR 403');
            this.auth.logout();
          }
        }
      }));
  }
}
