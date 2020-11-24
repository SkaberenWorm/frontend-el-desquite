import { AuthEffects } from './auth.effects';
import { RolEffects } from './rol.effects';
import { UsuarioEffects } from './usuario.effects';


export const appEffect: Array<any> = [
    AuthEffects,
    UsuarioEffects,
    RolEffects,
];

export * from './auth.effects';
export * from './usuario.effects';
export * from './rol.effects';

