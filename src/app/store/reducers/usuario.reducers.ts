import { Action, createReducer, on } from '@ngrx/store';
import { IPaginacion } from 'src/app/commons/interfaces/paginacion.interface';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';

import * as fromActions from '../actions/usuario.actions';

export interface UsuarioState {
    loading: boolean,
    listadoUsuarios: IPaginacion<UsuarioModel>,
    searchPagination: SearchPagination<string>,
    usuario: UsuarioModel,
    error: string,
    success: string,
    saving: boolean;
    saved: boolean;
    deleted: boolean;
    tokenCreado: boolean;
}

export const initialState: UsuarioState = {
    loading: false,
    listadoUsuarios: null,
    searchPagination: { page: 1, records: 10, seek: '' },
    usuario: null,
    error: null,
    success: null,
    saving: false,
    saved: false,
    deleted: false,
    tokenCreado: false,
}
const _usaurioReducer = createReducer(initialState,
    on(fromActions.listarUsuario, (state, { searchPagination }) => ({
        ...state,
        loading: true,
        searchPagination: searchPagination,
        usuario: null,
        success: null,
        saved: false,
        deleted: false,
        error: null,
        tokenCreado: false,
    })),
    on(fromActions.listarUsuarioSuccess, (state, { listadoUsuarios }) => ({
        ...state,
        loading: false,
        listadoUsuarios: listadoUsuarios,
    })),
    on(fromActions.listarUsuarioFail, (state, { mensaje }) => ({
        ...state,
        loading: false,
        error: mensaje,
    })),

    on(fromActions.guardarUsuario, (state): UsuarioState => ({
        ...state,
        saving: true,
        usuario: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
        tokenCreado: false,
    })),
    on(fromActions.guardarUsuarioSuccess, (state, { respuesta, mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        usuario: respuesta,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.guardarUsuarioFail, (state, { mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        error: mensaje
    })),

    on(fromActions.actualizarUsuario, (state): UsuarioState => ({
        ...state,
        saving: true,
        usuario: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
        tokenCreado: false,
    })),
    on(fromActions.actualizarUsuarioSuccess, (state, { respuesta, mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        usuario: respuesta,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.actualizarUsuarioFail, (state, { mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        error: mensaje
    })),

    on(fromActions.buscarUsuario, (state): UsuarioState => ({
        ...state,
        loading: true,
        usuario: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
        tokenCreado: false,
    })),
    on(fromActions.buscarUsuarioSuccess, (state, { usuario }): UsuarioState => ({
        ...state,
        loading: false,
        usuario: usuario,
    })),
    on(fromActions.buscarUsuarioFail, (state, { mensaje }): UsuarioState => ({
        ...state,
        loading: false,
        error: mensaje
    })),

    on(fromActions.cambiarEstadoUsuario, (state): UsuarioState => ({
        ...state,
        saving: true,
        usuario: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
        tokenCreado: false,
    })),
    on(fromActions.cambiarEstadoUsuarioSuccess, (state, { usuario, mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        usuario: usuario,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.cambiarEstadoUsuarioFail, (state, { mensaje }): UsuarioState => ({
        ...state,
        saving: false,
        error: mensaje
    })),

    on(fromActions.crearTokenParaCambiarPassword, (state): UsuarioState => ({
        ...state,
        error: null,
        success: null,
        saved: false,
        deleted: false,
        loading: true,
        tokenCreado: false,
    })),
    on(fromActions.crearTokenParaCambiarPasswordSuccess, (state, { resultado, mensaje }): UsuarioState => ({
        ...state,
        loading: false,
        success: mensaje,
        saved: true,
        tokenCreado: resultado,
    })),
    on(fromActions.crearTokenParaCambiarPasswordFail, (state, { mensaje }): UsuarioState => ({
        ...state,
        loading: false,
        error: mensaje
    })),

);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return _usaurioReducer(state, action);
}