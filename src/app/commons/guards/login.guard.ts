import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class LoginGuard implements CanActivate, CanLoad {

  constructor(
    public _auth: AuthenticationService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //console.log("canActivate");
    return this._auth.isLogin();
  }
  canLoad() {
    //console.log('canload');
    return this._auth.isLogin();

  }
}
