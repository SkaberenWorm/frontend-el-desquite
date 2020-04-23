import { PrivilegioModel } from "./privilegio.model";

export class RolModel {
  public id = 0;
  public nombre = '';
  public descripcion = '';
  public activo = true;
  public privilegios: Array<PrivilegioModel> = null;
  public privilegiosString = '';

  constructor(fields?: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    activo?: boolean;
    privilegios?: Array<PrivilegioModel>;
    privilegiosString?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
