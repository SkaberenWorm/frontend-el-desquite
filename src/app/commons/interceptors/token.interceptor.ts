import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!(request.url.indexOf('/free/') === -1)) {
      return next.handle(request);
    }

    if (request.url.indexOf('reset-password') === -1) {
      if (request.headers.get('Authorization') === null) {

        if (this.auth.token === '') {
          this.auth.cargarStorage();
        }
        const authReq = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.auth.token}`,
          }
        });
        return next.handle(authReq);
      } else {
        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}
