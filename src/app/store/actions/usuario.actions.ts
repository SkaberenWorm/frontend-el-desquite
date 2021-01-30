import { createAction, props } from '@ngrx/store';
import { IPaginacion } from 'src/app/commons/interfaces/paginacion.interface';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';

export const buscarUsuario = createAction(
    '[USUARIO MODEL] buscar por ID',
    props<{ usuarioId: number }>()
);
export const buscarUsuarioSuccess = createAction(
    '[USUARIO MODEL] buscar por ID success',
    props<{ usuario: UsuarioModel }>()
);
export const buscarUsuarioFail = createAction(
    '[USUARIO MODEL] buscar por ID fail',
    props<{ mensaje: string }>()
);

export const listarUsuario = createAction(
    '[USUARIO] listar usuario',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const listarUsuarioSuccess = createAction(
    '[USUARIO] listar usuario success',
    props<{ listadoUsuarios: IPaginacion<UsuarioModel> }>()
);
export const listarUsuarioFail = createAction(
    '[USUARIO] listar usuario success',
    props<{ mensaje: string }>()
);

export const guardarUsuario = createAction(
    '[USUARIO MODEL] guardar usuario',
    props<{ usuario: UsuarioModel }>()
);
export const guardarUsuarioSuccess = createAction(
    '[USUARIO MODEL] guardar usuario success',
    props<{ respuesta: UsuarioModel, mensaje: string }>()
);
export const guardarUsuarioFail = createAction(
    '[USUARIO MODEL] guardar usuario fail',
    props<{ mensaje: string }>()
);

export const actualizarUsuario = createAction(
    '[USUARIO MODEL] Actualizar usuario',
    props<{ usuario: UsuarioModel }>()
);
export const actualizarUsuarioSuccess = createAction(
    '[USUARIO MODEL] Actualizar usuario success',
    props<{ respuesta: UsuarioModel, mensaje: string }>()
);
export const actualizarUsuarioFail = createAction(
    '[USUARIO MODEL] Actualizar usuario fail',
    props<{ mensaje: string }>()
);

export const cambiarEstadoUsuario = createAction(
    '[USUARIO MODEL] Cambiar estado usuario',
    props<{ usuarioId: number }>()
);
export const cambiarEstadoUsuarioSuccess = createAction(
    '[USUARIO MODEL] Cambiar estado usuario success',
    props<{ usuario: UsuarioModel, mensaje: string }>()
);
export const cambiarEstadoUsuarioFail = createAction(
    '[USUARIO MODEL] Cambiar estado usuario fail',
    props<{ mensaje: string }>()
);

export const crearTokenParaCambiarPassword = createAction(
    '[USUARIO MODEL] Crear token para nueva clave',
    props<{ usuario: UsuarioModel }>()
);
export const crearTokenParaCambiarPasswordSuccess = createAction(
    '[USUARIO MODEL] Crear token para nueva clave',
    props<{ resultado: boolean, mensaje: string }>()
);
export const crearTokenParaCambiarPasswordFail = createAction(
    '[USUARIO MODEL] Crear token para nueva clave',
    props<{ mensaje: string }>()
);