import { PrivilegioModel } from './privilegio.model';

export class GrupoPrivilegioModel {
  public id = 0;
  public nombre = '';
  public activo = true;
  public privilegios = new Array<PrivilegioModel>();

  constructor(fields?: {
    id?: number;
    nombre?: string;
    activo?: boolean;
    privilegios?: Array<PrivilegioModel>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
