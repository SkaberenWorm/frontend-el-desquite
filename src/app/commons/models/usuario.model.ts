
import { RolModel } from "./rol.model";

export class UsuarioModel {

  public id = 0;
	public nombre = '';
	public apellidos = '';
	public email = '';
	public password = '';
	public activo = false;
  public nombreCompleto = '';
  public roles: Array<RolModel> = [];
  
  constructor(fields?: {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    activo?: boolean;
    nombreCompleto?: string;
    roles?: Array<RolModel>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
