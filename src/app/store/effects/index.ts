
import { AuthEffects } from './auth.effects';
import { UsuarioEffects } from './usuario.effects'

export const appEffect: Array<any> = [
    AuthEffects,
    UsuarioEffects
];

export * from './auth.effects';
export * from './usuario.effects';

