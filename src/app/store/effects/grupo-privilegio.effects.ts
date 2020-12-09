import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { GrupoPrivilegioService } from 'src/app/commons/services/grupo-privilegio.service';

import * as grupoPrivilegioActions from '../actions/grupo-privilegio.actions';

@Injectable()
export class GrupoPrivilegioEffects {
    constructor(
        private actions$: Actions,
        private grupoPrivilegioService: GrupoPrivilegioService,
        private toastr: ToastrService,
    ) { }

    listarGrupoPrivilegio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(grupoPrivilegioActions.listarGrupoPrivilegio),
            exhaustMap(_ =>
                this.grupoPrivilegioService.findAllActivos().pipe(
                    map(resul => {
                        if (resul['error']) {
                            return grupoPrivilegioActions.listarGrupoPrivilegioFail({ mensaje: resul.mensaje });
                        } else {
                            return grupoPrivilegioActions.listarGrupoPrivilegioSuccess({ respuesta: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('GrupoPrivilegio: Se produjo un error inesperado al intentar listar');
                        return of(grupoPrivilegioActions.listarGrupoPrivilegioFail({ mensaje: error }));
                    })
                )
            )
        )
    );

}