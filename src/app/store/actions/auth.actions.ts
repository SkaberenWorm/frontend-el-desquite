import { Action } from '@ngrx/store';


export const AUTENTICAR = '[AUTENTICAR]';
export const AUTENTICAR_SUCCESS = '[AUTENTICAR SUCCESS]';
export const AUTENTICAR_FAIL = '[AUTENTICAR FAIL]';
export const SET_AUTENTICADO = '[SET AUTENTICADO]';
export const LOGOUT = '[LOGOUT]';
export const LOGOUT_SUCCESS = '[LOGOUT SUCCESS]';

export class Autenticar implements Action {
    readonly type = AUTENTICAR;
    constructor(public identificacion: { usuario: string, clave: string }) { }
}
export class AutenticarSuccess implements Action {
    readonly type = AUTENTICAR_SUCCESS;
    constructor(public respuesta: any) { }
}
export class AutenticarFail implements Action {
    readonly type = AUTENTICAR_FAIL;
    constructor(public error: any) { }
}
export class SetAutenticado implements Action {
    readonly type = SET_AUTENTICADO;
    constructor(public usuario: any) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
}

export type authActions = Autenticar |
    AutenticarSuccess |
    AutenticarFail |
    SetAutenticado |
    Logout;
