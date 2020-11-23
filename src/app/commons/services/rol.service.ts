import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { RolModel } from '../models/rol.model';

@Injectable({
	providedIn: 'root'
})
export class RolService {

	private urlBase = `${environment.backend_url}api/rol`;
	constructor(private http: HttpClient) { }


	/**
	 * Obtiene un listado completo de los roles
	 */
	public findAllActivos(): Observable<ResultadoProc<Array<RolModel>>> {
		return this.http.get<ResultadoProc<Array<RolModel>>>(`${this.urlBase}/find-all-activos`);
	}
}
