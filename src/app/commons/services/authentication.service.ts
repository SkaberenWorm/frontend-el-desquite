import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { RespuestaLogin } from '../interfaces/respuesta-login-interface';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token = '';
  public nombre = '';
  public fin = 0;
  //public persona: PersonaModel = new PersonaModel();
  public usuario: UsuarioModel = new UsuarioModel();
  public imgUsuario: string = moment().format('X') + '.jpg';

  constructor(
    public _http: HttpClient,
    public router: Router // private _personaService: PersonaService
  ) {
    this.cargarStorage();
  }
  public cargarStorage() {
    this.token = '';
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '' && localStorage.getItem('token') !== undefined) {
      this.token = localStorage.getItem('token');
    }
    if (localStorage.getItem('nombre') !== null && localStorage.getItem('nombre') !== '' && localStorage.getItem('nombre') !== undefined) {
      this.nombre = localStorage.getItem('nombre');
    }
  }

  public generaHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', this.token);
  }
  public estaAutorizado() {
    if (this.token === null) {
      this.logout();
    } else if (this.token.trim().length === 0) {
      this.logout();
    }
    if (moment().isSameOrBefore(moment(this.fin)) && this.token.length > 120) {
      return true;
    } else {
      this.logout();
    }
  }
  public estaLogueado() {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.cargarStorage();
      if (this.token === null) {
        this.logout();
        resolve(false);
      }
      if (this.token.trim().length === 0) {
        this.logout();
        resolve(false);
      }
      if (moment().isSameOrBefore(moment(this.fin)) && this.token.trim().length > 120) {
        resolve(true);
      } else {
        this.logout();
        resolve(false);
      }
    });
    return promise;
  }
  public guardarStorage(respuesta: RespuestaLogin) {
    localStorage.setItem('token', respuesta.access_token);
    this.token = respuesta.access_token;
  }

  public logout() {
    this.token = '';

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isAuthorized() {
    if (this.token === null) {
      this.logout();
    } else if (this.token.trim().length === 0) {
      this.logout();
    }
    if (this.token.length > 120 && moment().isSameOrBefore(moment.unix(this.obtenerExpiracionToken(this.token)))) {
      return true;
    } else {
      this.logout();
    }
  }

  public isLogin(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.cargarStorage();

      if (this.token === null) {
        resolve(false);
        this.logout();
        return;
      }
      if (this.token.trim().length === 0) {
        resolve(false);
        this.logout();
        return;
      }
      if (this.token.length > 120 && moment().isSameOrBefore(moment.unix(this.obtenerExpiracionToken(this.token)))) {
        resolve(true);
      } else {
        resolve(false);
        this.logout();
      }
    });
    return promise;
  }

  public esRol(id_role: string): boolean {
    this.cargarStorage();
    let payload = this.obtenerDatosToken(this.token);
    if (payload !== null && payload.authorities !== undefined) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < payload.authorities.length; index++) {
        if (payload.authorities[index] === id_role) {
          return true;
        }
      }
    }
    return false;
  }

  private obtenerDatosToken(accessToken: string): any {
    if (accessToken != null && accessToken !== '') {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }
  private obtenerExpiracionToken(token: string): number {
    return this.obtenerDatosToken(token).exp;
  }
  private _obtenerUserName(token: string): string {
    return this.obtenerDatosToken(token).user_name;
  }
  public obtenerUserName(): string {
    return this._obtenerUserName(this.token);
  }

  public obtenerNombre(): string {
    return this.obtenerDatosToken(this.token).full_name;
  }

  public obtenerRole() {
    return this.obtenerDatosToken(this.token).authorities;
  }
}
