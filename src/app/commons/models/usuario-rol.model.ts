import { UsuarioModel } from "./usuario.model";
import { RolModel } from "./rol.model";

export class UsuarioRolModel {
  public id = 0;
  public usuario: UsuarioModel = null;
  public rol: RolModel = null; 

  constructor(fields?: {
    id?: number;
    rol?: RolModel;
    usuario?: UsuarioModel;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
