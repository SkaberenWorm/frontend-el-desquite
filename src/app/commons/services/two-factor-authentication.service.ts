import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResultadoProc } from '../interfaces/resultado-proc.interface';

@Injectable({
    providedIn: 'root'
})
export class TwoFactorAuthenticationService {

    private urlBase = `${environment.backend_url}two-factor`;
    constructor(private http: HttpClient) { }

    public generateCode(): Observable<ResultadoProc<string>> {
        return this.http.get<ResultadoProc<string>>(`${this.urlBase}/v2/generate`);
    }


}
