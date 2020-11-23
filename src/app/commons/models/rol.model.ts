export class RolModel {
  public id = 0;
  public nombre = '';
  public descripcion = '';
  public activo = true;
  public privilegios = new Array<any>();

  constructor(fields?: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    activo?: boolean;
    privilegios?: Array<any>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
