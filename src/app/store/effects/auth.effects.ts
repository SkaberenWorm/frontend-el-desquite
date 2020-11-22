import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as appActions from '../actions';
import { pipe, of, concat } from 'rxjs';
import { map, switchMap, catchError, concatMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { LoginService } from 'src/app/paginas/login/login.service';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private loginService: LoginService, private authenticationService: AuthenticationService) { }

  @Effect()
  authenticar$ = this.actions$.pipe(
    ofType(appActions.AUTENTICAR),
    switchMap(data => {
      const identificacion: { usuario: string; clave: string; tipo: string } = data['identificacion'];
      return this.loginService.login(identificacion.usuario, identificacion.clave).pipe(
        map(resul => {
          if (resul['error']) {
            return new appActions.AutenticarFail(resul);
          } else {
            this.authenticationService.guardarStorage(resul);
            return new appActions.AutenticarSuccess(resul);
          }
        }),
        catchError(error => of(new appActions.AutenticarFail(error)))
      );
    })
  );
}
