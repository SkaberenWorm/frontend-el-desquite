import { Action, createReducer, on } from '@ngrx/store';
import { GrupoPrivilegioModel } from 'src/app/commons/models/grupo-privilegio.model';

import * as fromActions from '../actions/grupo-privilegio.actions';

export interface GrupoPrivilegioState {
  loading: boolean;
  listadoGrupoPrivilegio: Array<GrupoPrivilegioModel>;
  grupoPrivilegio: GrupoPrivilegioModel;
  success: string;
  error: string;
  saving: boolean;
  saved: boolean;
  deleted: boolean;
}

const initState: GrupoPrivilegioState = {
  loading: false,
  listadoGrupoPrivilegio: null,
  grupoPrivilegio: null,
  success: null,
  error: null,
  saving: false,
  saved: false,
  deleted: false,
};

const _grupoPrivilegioReducer = createReducer(initState,

  on(fromActions.listarGrupoPrivilegio, (state): GrupoPrivilegioState => ({
    ...state,
    loading: true,
    error: null,
    success: null,
    saved: false,
    deleted: false,
    listadoGrupoPrivilegio: null,
  })),
  on(fromActions.listarGrupoPrivilegioSuccess, (state, { respuesta }): GrupoPrivilegioState => ({
    ...state,
    loading: false,
    listadoGrupoPrivilegio: respuesta,
  })),
  on(fromActions.listarGrupoPrivilegioFail, (state, { mensaje }): GrupoPrivilegioState => ({
    ...state,
    loading: false,
    error: mensaje
  })),
);

export function grupoPrivilegioReucer(state: GrupoPrivilegioState | undefined, action: Action) {
  return _grupoPrivilegioReducer(state, action);
}