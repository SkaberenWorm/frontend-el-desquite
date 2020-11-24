import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { RolService } from 'src/app/commons/services/rol.service';

import * as rolActions from '../actions/rol.actions';

@Injectable()
export class RolEffects {
    constructor(
        private actions$: Actions,
        private roleService: RolService,
        private toastr: ToastrService,
    ) { }

    listarRol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(rolActions.listarRol),
            exhaustMap(action =>
                this.roleService.findAllPaginatedWithSearch(action.searchPagination).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return rolActions.listarRolFail({ mensaje: resul.mensaje });
                        } else {
                            return rolActions.listarRolSuccess({ listadoRoles: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al listar los roles');
                        return of(rolActions.listarRolFail({ mensaje: error }));
                    })
                )
            )
        )
    );

    actualizarRol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(rolActions.actualizarRol),
            exhaustMap(action =>
                this.roleService.update(action.rol).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return rolActions.actualizarRolFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return rolActions.actualizarRolSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al actualizar el role');
                        return of(rolActions.actualizarRolFail({ mensaje: error }));
                    })
                )
            )
        )
    );

    guardarRol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(rolActions.guardarRol),
            exhaustMap(action =>
                this.roleService.save(action.rol).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return rolActions.guardarRolFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return rolActions.guardarRolSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el role');
                        return of(rolActions.guardarRolFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    buscarRol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(rolActions.buscarRol),
            exhaustMap(action =>
                this.roleService.findById(action.rolId).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return rolActions.buscarRolFail({ mensaje: resul.mensaje });
                        } else {
                            return rolActions.buscarRolSuccess({ rol: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el role');
                        return of(rolActions.buscarRolFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    cambiarEstadoRol$ = createEffect(() =>
        this.actions$.pipe(
            ofType(rolActions.cambiarEstadoRol),
            exhaustMap(action =>
                this.roleService.changeState(action.rolId).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return rolActions.cambiarEstadoRolFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return rolActions.cambiarEstadoRolSuccess({ rol: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el role');
                        return of(rolActions.cambiarEstadoRolFail({ mensaje: error }));
                    })
                )
            )
        )
    );

}