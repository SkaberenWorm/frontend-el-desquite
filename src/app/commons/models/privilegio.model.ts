export class PrivilegioModel {
  public id = 0;
  public nombre = '';
  public descripcion = '';
  public activo = true;

  constructor(fields?: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    activo?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
