import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { GrupoPrivilegioModel } from '../models/grupo-privilegio.model';

@Injectable({
	providedIn: 'root'
})
export class GrupoPrivilegioService {

	private urlBase = `${environment.backend_url}api/grupo-privilegio`;
	constructor(private http: HttpClient) { }


	/**
	 * Obtiene un listado completo de los grupoPrivilegioes
	 */
	public findAllActivos(): Observable<ResultadoProc<Array<GrupoPrivilegioModel>>> {
		return this.http.get<ResultadoProc<Array<GrupoPrivilegioModel>>>(`${this.urlBase}/find-all-activos`);
	}

}
