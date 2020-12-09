import { createAction, props } from '@ngrx/store';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { ProductoModel } from 'src/app/commons/models/producto.model';


export const buscarProducto = createAction(
    '[PRODUCTO MODEL] Buscar por ID',
    props<{ productoId: number }>()
);
export const buscarProductoSuccess = createAction(
    '[PRODUCTO MODEL] Buscar por ID success',
    props<{ respuesta: ProductoModel, mensaje: string }>()
);
export const buscarProductoFail = createAction(
    '[PRODUCTO MODEL] Buscar por ID fail',
    props<{ mensaje: string }>()
);

export const guardarProducto = createAction(
    '[PRODUCTO MODEL] Guardar Producto',
    props<{ producto: ProductoModel }>()
);
export const guardarProductoSuccess = createAction(
    '[PRODUCTO MODEL] Guardar Producto success',
    props<{ respuesta: ProductoModel, mensaje: string}>()
);
export const guardarProductoFail = createAction(
    '[PRODUCTO MODEL] Guardar Producto fail',
    props<{ mensaje: string }>()
);

export const actualizarProducto = createAction(
    '[PRODUCTO MODEL] Actualizar Producto',
    props<{ producto: ProductoModel }>()
);
export const actualizarProductoSuccess = createAction(
    '[PRODUCTO MODEL] Actualizar Producto success',
    props<{ respuesta: ProductoModel, mensaje: string }>()
);
export const actualizarProductoFail = createAction(
    '[PRODUCTO MODEL] Actualizar Producto fail',
    props<{ mensaje: string }>()
);
