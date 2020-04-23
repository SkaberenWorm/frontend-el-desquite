import * as fromAUTH from 'src/app/store/reducers/auth.reducers';
import * as fromUsuario from './reducers/usuario.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: fromAUTH.AuthState;
    usuario: fromUsuario.UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAUTH.authReducer,
    usuario: fromUsuario.usuarioReducer
};
