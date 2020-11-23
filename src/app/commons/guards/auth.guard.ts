import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public _auth: AuthenticationService,
    public router: Router
  ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this._auth.cargarStorage();
    if (this._auth.isAuthorized()) {
      return true;
    } else {
      return false;
    }
  }
}
