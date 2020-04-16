
import { UsuarioRolModel } from "./usuario-rol.model";

export class UsuarioModel {

  public id = 0;
	public nombre = '';
	public apellidos = '';
	public email = '';
	public password = '';
	public user = '';
	public activo = false;
  public nombreCompleto = '';
  public roles: Array<UsuarioRolModel> = [];
  
  constructor(fields?: {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    user?: string;
    activo?: boolean;
    nombreCompleto?: string;
    roles?: Array<UsuarioRolModel>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
