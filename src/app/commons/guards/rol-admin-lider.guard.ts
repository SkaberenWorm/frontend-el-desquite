import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { UtilAlert } from '../util/util.alert';


@Injectable()
export class RolAdminLiderGuard implements CanActivate {
  constructor(
    public _authService: AuthenticationService,
    public router: Router,
    private _alert: UtilAlert
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.esRol('ROLE_ADMIN') || this._authService.esRol('ROLE_LIDER')) {
      return true;
    }
    this._alert.errorSwal('No tienes Permisos para ingresar a la página solicitada');
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.esRol('ROLE_ADMIN') || this._authService.esRol('ROLE_LIDER')) {
      return true;
    }
    this._alert.errorSwal('No tienes Permisos para ingresar a la página solicitada');
    return false;
  }
}
