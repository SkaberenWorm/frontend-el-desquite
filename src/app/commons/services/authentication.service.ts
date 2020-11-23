import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { setAuthenticado } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.reducer';

import { environment } from '../../../environments/environment';
import { RespuestaLogin } from '../interfaces/respuesta-login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token = '';
  private refreshToken = '';
  // public nombre = '';
  public fin = 0;

  private refrescarPaginaLogin = false;

  constructor(
    public _http: HttpClient,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.cargarStorage();
  }
  public cargarStorage() {
    this.token = '';
    if ((localStorage.getItem(this.btoaAuth('token'))) !== null &&
      (localStorage.getItem(this.btoaAuth('token'))) !== '' &&
      (localStorage.getItem(this.btoaAuth('token'))) !== undefined) {
      this.token = this._atobAuth(localStorage.getItem(this.btoaAuth('token')));
    }
    if ((localStorage.getItem(this.btoaAuth('refresh_token'))) !== null &&
      (localStorage.getItem(this.btoaAuth('refresh_token'))) !== '' &&
      (localStorage.getItem(this.btoaAuth('refresh_token'))) !== undefined) {
      this.refreshToken = this._atobAuth(localStorage.getItem(this.btoaAuth('refresh_token')));
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
    const promise = new Promise<boolean>((resolve) => {
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
    localStorage.setItem(this.btoaAuth('token'), this.btoaAuth(respuesta.access_token));
    localStorage.setItem(this.btoaAuth('refresh_token'), this.btoaAuth(respuesta.refresh_token));
    this.cargarStorage();
  }

  public setToken(token: string) {
    this.cargarStorage();
    if (this.token != '') {
      if (this.obtenerExpiracionToken(this.token) <= this.obtenerExpiracionToken(token)) {
        localStorage.setItem(this.btoaAuth('token'), this.btoaAuth(token));
        this.token = token;
      }
    } else {
      this.token = token;
      localStorage.setItem(this.btoaAuth('token'), this.btoaAuth(token));
    }
  }

  public isAuthenticated() {
    if (this.token === null) {
      return false;
    } else if (this.token.trim().length === 0) {
      return false;
    }
    if (this.token.length > 120 && moment().isSameOrBefore(moment.unix(this.obtenerExpiracionToken(this.token)))) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    this.token = '';
    localStorage.removeItem(this.btoaAuth('nombre'));
    localStorage.removeItem(this.btoaAuth('token'));
    localStorage.removeItem(this.btoaAuth('refresh_token'));
    this.router.navigate(['/login']);
  }

  public removeRefreshToken() {
    localStorage.removeItem(this.btoaAuth('refresh_token'));
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
        this.logout();
        resolve(false);
        return;
      }
      if (this.token.length > 120 && moment().isSameOrBefore(moment.unix(this.obtenerExpiracionToken(this.token)))) {
        resolve(true);
      } else {
        this.refrescarPaginaLogin = true;
        this.refrescarToken();
        resolve(false);
      }
    });
    return promise;
  }

  public esRol(id_role: string): boolean {
    this.cargarStorage();
    let payload = this.obtenerDatosToken(this.token);
    if (payload !== null && payload.roles !== undefined) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < payload.roles.length; index++) {
        if (payload.roles[index] === id_role) {
          return true;
        }
      }
    }
    return false;
  }

  private obtenerDatosToken(accessToken: string): any {
    try {
      if (accessToken != null && accessToken !== '') {
        return JSON.parse(atob(accessToken.split(".")[1]));
      }
    } catch (error) {
      this.logout();
    }
    return '';
  }



  public obtenerToken() {
    return this.token;
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

  public obtenerName(): string {
    return this.obtenerDatosToken(this.token).full_name;
  }

  public obtenerRole() {
    return this.obtenerDatosToken(this.token).roles;
  }

  public obtenerExpirationDate(): number {
    return parseInt(this.obtenerDatosToken(this.token).exp + "000");
  }

  public getExpirationDateRefreshToken(): number {
    return parseInt(this.obtenerDatosToken(this.refreshToken).exp + "000");
  }

  public refrescarToken() {
    var today = moment(new Date());
    var expiration = moment(this.getExpirationDateRefreshToken());
    if (today.isBefore(expiration)) {
      // console.log('TODAY                            ', moment(moment(new Date()).toDate()).format("YYYY-MM-DD HH:mm:ss"));
      // console.log("ExpirationDate() =>              ", moment(moment(this.obtenerExpirationDate()).toDate()).format("YYYY-MM-DD HH:mm:ss"));
      // console.log("ExpirationDateRefreshToken() =>  ", moment(moment(this.getExpirationDateRefreshToken()).toDate()).format("YYYY-MM-DD HH:mm:ss"));

      const url = `${environment.auth_url}oauth/token`;
      let bodyH: HttpParams;
      bodyH = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', this.refreshToken)
      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
          .set('Authorization', 'Basic ZGVzcXVpdGVDbGllbnQ6N2IyYmIzZjMtNzk4ZC00N2IyLTkwY2UtNTkyZDE5Y2NlZGMw'),
        body: bodyH
      };
      return this._http.post<RespuestaLogin>(url, bodyH.toString(), options).subscribe(result => {
        this.guardarStorage(result);
        if (this.refrescarPaginaLogin) {
          this.store.dispatch(setAuthenticado({ usuario: this.obtenerUserName() }));
          this.router.navigate(['/login']);
        }
      });
    } else {
      console.log('Inválido para refrescar');
      this.logout();
    }
    this.refrescarPaginaLogin = false;
  }

  public obtenerIdSistema() {
    return this._atobAuth(localStorage.getItem(this.btoaAuth('id_sistema')));
  }

  public setIdSistema(idSistema: string) {
    localStorage.setItem(this.btoaAuth('id_sistema'), this.btoaAuth(idSistema));
  }

  /**
   * Encripta un texto
   * @param value Texo a encriptar
   */
  public btoaAuth(value: string) {
    return btoa(value);
  }

  /**
   * Desencriptar un texto
   * @param value Texto a desencriptar
   */
  private _atobAuth(value: string) {
    try {
      return atob(value);
    } catch (error) {
      return null;
    }

  }

}
