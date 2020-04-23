import { createAction, props } from '@ngrx/store';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';

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