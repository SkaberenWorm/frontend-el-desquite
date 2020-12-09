import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from 'src/app/store/reducers/auth.reducers';
import * as fromGrupoPrivilegio from 'src/app/store/reducers/grupo-privilegio.reducers';
import * as fromRol from 'src/app/store/reducers/rol.reducers';
import * as fromUsuario from 'src/app/store/reducers/usuario.reducers';

export interface AppState {
    auth: fromAuth.AuthState;
    usuario: fromUsuario.UsuarioState;
    rol: fromRol.RolState
    grupoPrivilegio: fromGrupoPrivilegio.GrupoPrivilegioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    usuario: fromUsuario.usuarioReducer,
    rol: fromRol.rolReducer,
    grupoPrivilegio: fromGrupoPrivilegio.grupoPrivilegioReucer,
};
