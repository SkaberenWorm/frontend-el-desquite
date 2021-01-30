import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResultadoProc } from '../interfaces/resultado-proc.interface';

@Injectable({
    providedIn: 'root'
})
export class CambiarPasswordService {

    private urlBase = `${environment.backend_url}usuario-token`;
    constructor(private http: HttpClient) { }

    public validarTokenForNewPassword(token: string): Observable<ResultadoProc<boolean>> {
        return this.http.get<ResultadoProc<boolean>>(`${this.urlBase}/validate-new-password/${token}`);
    }

    public validarTokenForChangePassword(token: string): Observable<ResultadoProc<boolean>> {
        return this.http.get<ResultadoProc<boolean>>(`${this.urlBase}/validate-change-password/${token}`);
    }

    public cambiarPassword(token: string, claves: any): Observable<ResultadoProc<boolean>> {
        return this.http.post<ResultadoProc<boolean>>(`${this.urlBase}/change-password/${token}`, claves);
    }

    public nuevaPassword(token: string, claves: any): Observable<ResultadoProc<boolean>> {
        return this.http.post<ResultadoProc<boolean>>(`${this.urlBase}/new-password/${token}`, claves);
    }


}
