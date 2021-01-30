import { Action, createReducer, on } from '@ngrx/store';
import { IPaginacion } from 'src/app/commons/interfaces/paginacion.interface';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { RolModel } from 'src/app/commons/models/rol.model';

import * as fromActions from '../actions/rol.actions';

export interface RolState {
    loading: boolean,
    listadoRoles: IPaginacion<RolModel>,
    searchPagination: SearchPagination<string>,
    rol: RolModel,
    error: string,
    success: string,
    saving: boolean;
    saved: boolean;
    deleted: boolean;
}

export const initialState: RolState = {
    loading: false,
    listadoRoles: null,
    searchPagination: { page: 1, records: 10, seek: '' },
    rol: null,
    error: null,
    success: null,
    saving: false,
    saved: false,
    deleted: false,
}
const _usaurioReducer = createReducer(initialState,
    on(fromActions.listarRol, (state, { searchPagination }) => ({
        ...state,
        loading: true,
        searchPagination: searchPagination,
        rol: null,
        success: null,
        saved: false,
        deleted: false,
        error: null,
    })),
    on(fromActions.listarRolSuccess, (state, { listadoRoles }) => ({
        ...state,
        loading: false,
        listadoRoles: listadoRoles,
    })),
    on(fromActions.listarRolFail, (state, { mensaje }) => ({
        ...state,
        loading: false,
        error: mensaje,
    })),

    on(fromActions.guardarRol, (state): RolState => ({
        ...state,
        saving: true,
        rol: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
    })),
    on(fromActions.guardarRolSuccess, (state, { respuesta, mensaje }): RolState => ({
        ...state,
        saving: false,
        rol: respuesta,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.guardarRolFail, (state, { mensaje }): RolState => ({
        ...state,
        saving: false,
        error: mensaje
    })),

    on(fromActions.actualizarRol, (state): RolState => ({
        ...state,
        saving: true,
        rol: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
    })),
    on(fromActions.actualizarRolSuccess, (state, { respuesta, mensaje }): RolState => ({
        ...state,
        saving: false,
        rol: respuesta,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.actualizarRolFail, (state, { mensaje }): RolState => ({
        ...state,
        saving: false,
        error: mensaje
    })),

    on(fromActions.buscarRol, (state): RolState => ({
        ...state,
        loading: true,
        rol: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
    })),
    on(fromActions.buscarRolSuccess, (state, { rol }): RolState => ({
        ...state,
        loading: false,
        rol: rol,
    })),
    on(fromActions.buscarRolFail, (state, { mensaje }): RolState => ({
        ...state,
        loading: false,
        error: mensaje
    })),

    on(fromActions.cambiarEstadoRol, (state): RolState => ({
        ...state,
        saving: true,
        rol: null,
        error: null,
        success: null,
        saved: false,
        deleted: false,
    })),
    on(fromActions.cambiarEstadoRolSuccess, (state, { rol, mensaje }): RolState => ({
        ...state,
        saving: false,
        rol: rol,
        success: mensaje,
        saved: true,
    })),
    on(fromActions.cambiarEstadoRolFail, (state, { mensaje }): RolState => ({
        ...state,
        saving: false,
        error: mensaje
    })),



);

export function rolReducer(state: RolState | undefined, action: Action) {
    return _usaurioReducer(state, action);
}