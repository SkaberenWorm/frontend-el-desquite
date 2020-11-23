import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class LoginGuard implements CanActivate, CanLoad {

  constructor(
    public _auth: AuthenticationService,
    public router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.isLogin();
  }

  canLoad() {
    if (this._auth.isLogin()) {
      return true;
    } else {
      console.log('LoginGuard - logout()');
      this._auth.logout();
      return false;
    }
  }
}
