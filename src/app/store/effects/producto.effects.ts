import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductoService } from 'src/app/commons/services/producto.service';

import * as productoActions from '../actions/producto.actions';

@Injectable()
export class ProductoEffects {
    constructor(
        private actions$: Actions,
        private productoService: ProductoService,
        private toastr: ToastrService,
    ) { }



    buscarProducto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productoActions.buscarProducto),
            exhaustMap(action =>
                this.productoService.findById(action.productoId).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return productoActions.buscarProductoFail({ mensaje: resul.mensaje });
                        } else {
                            return productoActions.buscarProductoSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Producto: Se produjo un error inesperado al intentar buscar');
                        return of(productoActions.buscarProductoFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    guardarProducto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productoActions.guardarProducto),
            exhaustMap(action =>
                this.productoService.save(action.producto).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return productoActions.guardarProductoFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return productoActions.guardarProductoSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Producto: Se produjo un error inesperado al intentar registrar');
                        return of(productoActions.guardarProductoFail({ mensaje: error }));
                    })
                )
            )
        )
    );


    actualizarProducto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productoActions.actualizarProducto),
            exhaustMap(action =>
                this.productoService.update(action.producto).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return productoActions.actualizarProductoFail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return productoActions.actualizarProductoSuccess({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('Producto: Se produjo un error inesperado al intentar actualizar');
                        return of(productoActions.actualizarProductoFail({ mensaje: error }));
                    })
                )
            )
        )
    );

}