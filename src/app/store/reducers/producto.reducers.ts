import { Action, createReducer, on } from '@ngrx/store';
import { IPaginacion } from 'src/app/commons/interfaces/paginacion.interface';
import { ProductoModel } from 'src/app/commons/models/producto.model';

import * as fromActions from '../actions/producto.actions';

export interface ProductoState {
  loading: boolean;
  listadoProducto: IPaginacion<ProductoModel>;
  producto: ProductoModel;
  success: string;
  error: string;
  saving: boolean;
  saved: boolean;
  deleted: boolean;
}

const initState: ProductoState = {
  loading: false,
  listadoProducto: null,
  producto: null,
  success: null,
  error: null,
  saving: false,
  saved: false,
  deleted: false,
};

const _productoReducer = createReducer(initState,


  on(fromActions.buscarProducto, (state): ProductoState => ({
    ...state,
    loading: true,
    producto: null,
    error: null,
    success: null,
    deleted: false,
  })),
  on(fromActions.buscarProductoSuccess, (state, { respuesta, mensaje }): ProductoState => ({
    ...state,
    loading: false,
    producto: respuesta,
    success: mensaje,
  })),
  on(fromActions.buscarProductoFail, (state, { mensaje }): ProductoState => ({
    ...state,
    loading: false,
    error: mensaje
  })),

  on(fromActions.guardarProducto, (state): ProductoState => ({
    ...state,
    saving: true,
    producto: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.guardarProductoSuccess, (state, { respuesta, mensaje }): ProductoState => ({
    ...state,
    saving: false,
    producto: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.guardarProductoFail, (state, { mensaje }): ProductoState => ({
    ...state,
    saving: false,
    error: mensaje
  })),

  on(fromActions.actualizarProducto, (state): ProductoState => ({
    ...state,
    saving: true,
    producto: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.actualizarProductoSuccess, (state, { respuesta, mensaje }): ProductoState => ({
    ...state,
    saving: false,
    producto: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.actualizarProductoFail, (state, { mensaje }): ProductoState => ({
    ...state,
    saving: false,
    error: mensaje
  })),
);

export function productoReucer(state: ProductoState | undefined, action: Action) {
  return _productoReducer(state, action);
}