import { createAction, props } from '@ngrx/store';
import { RespuestaLogin } from 'src/app/commons/interfaces/respuesta-login-interface';

export const autenticar = createAction(
    '[LOGIN] Autenticar',
    props<{ identificacion: { usuario: string, clave: string } }>()
);
export const autenticarSuccess = createAction(
    '[LOGIN] Autenticar success',
    props<{ respuesta: RespuestaLogin }>()
);
export const autenticarFail = createAction(
    '[LOGIN] Autenticar fail',
    props<{ error: any }>()
);

export const setAuthenticado = createAction(
    '[LOGIN] Set autenticado',
    props<{ usuario: any }>()
);

export const logout = createAction('[LOGIN] Logout');

