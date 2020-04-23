import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/usuario.actions';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';
import { Action } from '@ngrx/store';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';

export interface UsuarioState {
    loading: boolean,
    listadoUsuarios: IPaginacion<UsuarioModel>,
    searchPagination: SearchPagination<string>,
    mensajeError: string,
}

export const initialState: UsuarioState = {
    loading: false,
    listadoUsuarios: null,
    searchPagination: { page: 1, records: 10, seek: '' },
    mensajeError: null
}
const _usaurioReducer = createReducer(initialState,
    on(fromActions.listarUsuario, (state, { searchPagination }) => ({
        ...state,
        loading: true,
        searchPagination: searchPagination,
    })),
    on(fromActions.listarUsuarioSuccess, (state, { listadoUsuarios }) => ({
        ...state,
        loading: false,
        listadoUsuarios: listadoUsuarios,
    })),
    on(fromActions.listarUsuarioFail, (state, { mensaje }) => ({
        ...state,
        loading: false,
        mensajeError: mensaje,
    }))
);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return _usaurioReducer(state, action);
}