
import { Observable, } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            swal.fire({
              title: 'Error',
              text: 'Su sesión ha finalizado',
              type: 'error',
              allowOutsideClick: false,
              allowEscapeKey: false
            });
            this.auth.logout();
          }
          if (err.status === 403) {
            swal.fire({
              title: 'Error',
              text: 'No tienes Permisos para ejecutar esta acción',
              type: 'error',
              allowOutsideClick: false,
              allowEscapeKey: false
            });
            this.auth.logout();
          }
        }
      }));
  }
}
