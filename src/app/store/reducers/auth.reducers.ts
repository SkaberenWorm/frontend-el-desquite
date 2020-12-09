import { Action, createReducer, on } from '@ngrx/store';
import { RespuestaLogin } from 'src/app/commons/interfaces/respuesta-login-interface';

import * as fromActions from '../actions/auth.actions';

export interface AuthState {
  loading: boolean;
  authenticate: boolean;
  login: RespuestaLogin;
  user: string;
  error: any;
  logout: boolean;
}

const initState: AuthState = {

  loading: false,
  authenticate: false,
  login: null,
  error: null,
  user: null,
  logout: true,

};

const _authReducer = createReducer(initState,
  on(fromActions.autenticar, (state, { identificacion }): AuthState => ({
    ...state,
    user: identificacion.usuario,
    loading: true,
  })),
  on(fromActions.autenticarSuccess, (state, { respuesta }): AuthState => ({
    ...state,
    authenticate: true,
    loading: false,
    login: respuesta,
    error: null,
    logout: false
  })),
  on(fromActions.autenticarFail, (state, { error }): AuthState => ({
    ...state,
    authenticate: false,
    loading: false,
    error: { error: error.error.error, status: error.error.status }
  })),
  on(fromActions.setAuthenticado, (state, { usuario }): AuthState => ({
    ...state,
    authenticate: true,
    user: usuario,
    logout: false,
  })),
  on(fromActions.logout, (): AuthState => initState),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

