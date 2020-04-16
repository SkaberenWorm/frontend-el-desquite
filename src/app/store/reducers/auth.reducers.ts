import { RespuestaLogin } from 'src/app/commons/interfaces/respuesta-login-interface';
import * as fromActions from '../actions';

export interface AuthState {
  loading: boolean;
  authenticate: boolean;
  login: RespuestaLogin;
  user: string;
  error: any;
}

const initState: AuthState = {

  loading: false,
  authenticate: false,
  login: null,
  error: null,
  user: null,

};
export function authReducer(state = initState, action: fromActions.authActions): AuthState {
  switch (action.type) {
    case fromActions.AUTENTICAR:
      return {
        ...state,
        loading: true,
        user: action.identificacion.usuario,
        error: null
      };
    case fromActions.AUTENTICAR_SUCCESS:
      return {
        ...state,
        authenticate: true,
        loading: false,
        login: action.respuesta,
        error: null
      };
    case fromActions.AUTENTICAR_FAIL:
      return {
        ...state,
        authenticate: false,
        loading: false,
        error: { error: action.error.error, status: action.error.status }
      };
    case fromActions.SET_AUTENTICADO:
      return {
        ...state,
        authenticate: true,
        user: action.usuario
      };
    case fromActions.LOGOUT:
      return this.initState;
    default:
      return state;
  }
}
