import { RolModel } from './rol.model';


export class UsuarioModel {

  public id = 0;
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = false;
  public nombreCompleto = '';
  public roles = new Array<RolModel>();
  public using2FA = false;

  constructor(fields?: {
    id?: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
    activo?: boolean;
    nombreCompleto?: string;
    roles?: Array<RolModel>;
    using2FA?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
