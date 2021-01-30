import { createAction, props } from '@ngrx/store';
import { IPaginacion } from 'src/app/commons/interfaces/paginacion.interface';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { RolModel } from 'src/app/commons/models/rol.model';

export const buscarRol = createAction(
    '[ROL MODEL] buscar por ID',
    props<{ rolId: number }>()
);
export const buscarRolSuccess = createAction(
    '[ROL MODEL] buscar por ID success',
    props<{ rol: RolModel }>()
);
export const buscarRolFail = createAction(
    '[ROL MODEL] buscar por ID fail',
    props<{ mensaje: string }>()
);

export const listarRol = createAction(
    '[ROL MODEL] listar rol',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const listarRolSuccess = createAction(
    '[ROL MODEL] listar rol success',
    props<{ listadoRoles: IPaginacion<RolModel> }>()
);
export const listarRolFail = createAction(
    '[ROL MODEL] listar rol success',
    props<{ mensaje: string }>()
);

export const guardarRol = createAction(
    '[ROL MODEL] guardar rol',
    props<{ rol: RolModel }>()
);
export const guardarRolSuccess = createAction(
    '[ROL MODEL] guardar rol success',
    props<{ respuesta: RolModel, mensaje: string }>()
);
export const guardarRolFail = createAction(
    '[ROL MODEL] guardar rol fail',
    props<{ mensaje: string }>()
);

export const actualizarRol = createAction(
    '[ROL MODEL] Actualizar rol',
    props<{ rol: RolModel }>()
);
export const actualizarRolSuccess = createAction(
    '[ROL MODEL] Actualizar rol success',
    props<{ respuesta: RolModel, mensaje: string }>()
);
export const actualizarRolFail = createAction(
    '[ROL MODEL] Actualizar rol fail',
    props<{ mensaje: string }>()
);

export const cambiarEstadoRol = createAction(
    '[ROL MODEL] Cambiar estado rol',
    props<{ rolId: number }>()
);
export const cambiarEstadoRolSuccess = createAction(
    '[ROL MODEL] Cambiar estado rol success',
    props<{ rol: RolModel, mensaje: string }>()
);
export const cambiarEstadoRolFail = createAction(
    '[ROL MODEL] Cambiar estado rol fail',
    props<{ mensaje: string }>()
);
