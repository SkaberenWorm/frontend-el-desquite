import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from 'src/app/store/reducers/auth.reducers';
import * as fromUsuario from 'src/app/store/reducers/usuario.reducers';

export interface AppState {
    auth: fromAuth.AuthState;
    usuario: fromUsuario.UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    usuario: fromUsuario.usuarioReducer,
};
