import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/commons/services/usuario.service';
import * as usuarioActions from '../actions/usuario.actions';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions, private usuarioService: UsuarioService) { }

    usuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.listarUsuario),
            exhaustMap(action =>
                this.usuarioService.findAllPaginatedWithFilters(action.searchPagination).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return usuarioActions.listarUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            return usuarioActions.listarUsuarioSuccess({ listadoUsuarios: resul.resultado });
                        }
                    }),
                    catchError(error => of(usuarioActions.listarUsuarioFail({ mensaje: error })))
                )
            )
        )
    );
}