import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '..//../../environments/environment';
import { RespuestaLogin } from '../interfaces/respuesta-login-interface';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { UsuarioModel } from '../models/usuario.model';
import { AuthenticationService } from './authentication.service';

/**
 * Pasos para authenticarse <br>
 * 1. Verificar credenciales login()
 * 2. Si tiene 2FA Verificar el codigo de autorización
 * 3. Logearse y obtener token
 */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(public http: HttpClient,
        public router: Router,
        public authService: AuthenticationService) { }

    public validateCredentialsUser(username: string, password: string): Observable<ResultadoProc<UsuarioModel>> {
        const url = `${environment.auth_url}api/usuario/free/validate-credentials`;
        let body = {
            "usuario": username,
            "password": password,
        }
        return this.http.post<ResultadoProc<UsuarioModel>>(url, body);
    }

    public verificarTwoFactor(username: string, code: string): Observable<ResultadoProc<boolean>> {
        const url = `${environment.auth_url}two-factor/free/validate/key`;
        let body = {
            "usuario": username,
            "code": code,
        }
        return this.http.post<ResultadoProc<boolean>>(url, body);
    }

    public loginOauth(username: string, password: string) {
        const url = `${environment.auth_url}oauth/token`;
        let bodyH: HttpParams;

        bodyH = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password');

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
                .set('Authorization', 'Basic ZGVzcXVpdGVDbGllbnQ6N2IyYmIzZjMtNzk4ZC00N2IyLTkwY2UtNTkyZDE5Y2NlZGMw'),
            body: bodyH
        };
        return this.http.post<RespuestaLogin>(url, bodyH.toString(), options);
    }
}
