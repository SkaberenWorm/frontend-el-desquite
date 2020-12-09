import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { LoginService } from 'src/app/commons/services/login.service';
import { UtilAlert } from 'src/app/commons/util/util.alert';

import * as appActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  @BlockUI() blockUIPage: NgBlockUI;
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private _alert: UtilAlert,
  ) { }

  @Effect()
  authenticar$ = this.actions$.pipe(
    ofType(appActions.autenticar),
    switchMap(data => {
      const identificacion: { usuario: string; clave: string; } = data['identificacion'];
      this.blockUIPage.start();
      return this.loginService.loginOauth(identificacion.usuario, identificacion.clave).pipe(
        map(resul => {
          this.blockUIPage.stop();
          if (resul['error']) {
            return appActions.autenticarFail({ error: resul });
          } else {
            this.authenticationService.guardarStorage(resul);
            return appActions.autenticarSuccess({ respuesta: resul });
          }
        }),
        catchError(error => {
          if ('Bad credentials' == error.error.error_description) {
            this._alert.errorSwal('Usuario o clave incorrectos');
          } else {
            this._alert.errorSwal(error.error.error_description);
          }
          return of(appActions.autenticarFail({ error: error }));
        })
      );
    })
  );



}
