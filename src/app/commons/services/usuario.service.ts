import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SearchPagination } from '../interfaces/search-pagination';
import { Observable } from 'rxjs';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	private urlBase = `${environment.backend_url}api/usuario`;
	constructor(private http: HttpClient) { }

	/**
	 * Retorna un IPaginacion de todos los usuarios que coinciden con el buscador
	 * 
	 * @param searchPagination (En el seek se envía el texto ingresado en el buscador)
	 * @return Una página de usuarios coincidentes con los filtros
	 */
	public findAllPaginatedWithFilters(searchPagination: SearchPagination<String>): Observable<ResultadoProc<IPaginacion<UsuarioModel>>> {
		return this.http.post<ResultadoProc<IPaginacion<UsuarioModel>>>(`${this.urlBase}/page-with-filters`, searchPagination);
	}

	/**
	 * Guarda o actualiza un usuario
	 * 
	 * @param usuario (Entidad UsuarioModel)
	 * @return UsuarioModel guardado/actualizado
	 */
	public save(usuario: UsuarioModel): Observable<ResultadoProc<UsuarioModel>> {
		return this.http.post<ResultadoProc<UsuarioModel>>(`${this.urlBase}`, usuario);
	}


	/**
	 * Cambia el estado del usuario.
	 * 
	 * Si activo es true lo cambia a false. 
	 * 
	 * Si activo es false lo cambia a true.
	 * 
	 * @param usuarioId (Id del usuario)
	 * @return ResultadoProc&lt;UsuarioModel&gt; El usuario al que le fue cambiado el
	 *         estado
	 */
	public changeState(usuarioId: number): Observable<ResultadoProc<UsuarioModel>> {
		return this.http.get<ResultadoProc<UsuarioModel>>(`${this.urlBase}/change-state/${usuarioId}`);
	}


	/**
	 * Busca un usuario por su ID.
	 * 
	 * @param usuarioId (Identificador del usuario)
	 * @return UsuarioModel con el ID dado
	 */
	public findById(usuarioId: number): Observable<ResultadoProc<UsuarioModel>> {
		return this.http.get<ResultadoProc<UsuarioModel>>(`${this.urlBase}/${usuarioId}`);
	}
}
