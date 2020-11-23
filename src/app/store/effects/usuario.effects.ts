import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/commons/services/usuario.service';

import * as usuarioActions from '../actions/usuario.actions';

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService,
        private toastr: ToastrService,
    ) { }

    usuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.listarUsuario),
            exhaustMap(action =>
                this.usuarioService.findAllPaginatedWithSearch(action.searchPagination).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return usuarioActions.listarUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            return usuarioActions.listarUsuarioSuccess({ listadoUsuarios: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al listar los usuarios');
                        return of(usuarioActions.listarUsuarioFail({ mensaje: error }));
                    })
                )
            )
        )
    );

    actualizarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.actualizarUsuario),
            exhaustMap(action =>
                this.usuarioService.update(action.usuario).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return usuarioActions.actualizarUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return usuarioActions.actualizarUsuarioSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al actualizar el usuario');
                        return of(usuarioActions.actualizarUsuarioFail({ mensaje: error }));
                    })
                )
            )
        )
    );

    guardarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.guardarUsuario),
            exhaustMap(action =>
                this.usuarioService.save(action.usuario).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return usuarioActions.guardarUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return usuarioActions.guardarUsuarioSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el usuario');
                        return of(usuarioActions.guardarUsuarioFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    buscarUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.buscarUsuario),
            exhaustMap(action =>
                this.usuarioService.findById(action.usuarioId).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return usuarioActions.buscarUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            return usuarioActions.buscarUsuarioSuccess({ usuario: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el usuario');
                        return of(usuarioActions.buscarUsuarioFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    cambiarEstadoUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.cambiarEstadoUsuario),
            exhaustMap(action =>
                this.usuarioService.changeState(action.usuarioId).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return usuarioActions.cambiarEstadoUsuarioFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return usuarioActions.cambiarEstadoUsuarioSuccess({ usuario: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al registrar el usuario');
                        return of(usuarioActions.cambiarEstadoUsuarioFail({ mensaje: error }));
                    })
                )
            )
        )
    );

    crearTokenParaCambiarPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.crearTokenParaCambiarPassword),
            exhaustMap(action =>
                this.usuarioService.createTokenForResetPassword(action.usuario).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return usuarioActions.crearTokenParaCambiarPasswordFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje, '', {
                                timeOut: 10000
                            });
                            return usuarioActions.crearTokenParaCambiarPasswordSuccess({ resultado: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Se produjo un error inesperado al crear un nuevo token para el cambio de clave del usuario');
                        return of(usuarioActions.crearTokenParaCambiarPasswordFail({ mensaje: error }));
                    })
                )
            )
        )
    );
}