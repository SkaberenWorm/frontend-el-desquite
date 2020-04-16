
export class ProductoModel {
  public id = 0;
  public activo = true;
  constructor(fields?: {
    id?: number;
    activo?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class ProductoFilter{
  public query = '';
	public categoriasId: Array<number> = [];
  constructor(fields?: {
    query?: string;
    categoriasId?: Array<number>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
