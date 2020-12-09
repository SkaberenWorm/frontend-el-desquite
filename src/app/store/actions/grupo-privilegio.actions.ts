import { createAction, props } from '@ngrx/store';
import { GrupoPrivilegioModel } from 'src/app/commons/models/grupo-privilegio.model';



export const listarGrupoPrivilegio = createAction(
    '[GRUPO PRIVILEGIO MODEL] Listar'
);
export const listarGrupoPrivilegioSuccess = createAction(
    '[GRUPO PRIVILEGIO MODEL] Listar success',
    props<{ respuesta: Array<GrupoPrivilegioModel> }>()
);
export const listarGrupoPrivilegioFail = createAction(
    '[GRUPO PRIVILEGIO MODEL] Listar fail',
    props<{ mensaje: string }>()
);
