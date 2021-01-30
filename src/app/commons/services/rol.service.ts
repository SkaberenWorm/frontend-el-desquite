import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IPaginacion } from '../interfaces/paginacion.interface';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { SearchPagination } from '../interfaces/search.pagination';
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

    /**
     * Retorna un IPaginacion de todos los roles que coinciden con el buscador
     * 
     * @param searchPagination (En el seek se envía el texto ingresado en el buscador)
     * @return Una página de roles coincidentes con los filtros
     */
    public findAllPaginatedWithSearch(searchPagination: SearchPagination<String>): Observable<ResultadoProc<IPaginacion<RolModel>>> {
        return this.http.post<ResultadoProc<IPaginacion<RolModel>>>(`${this.urlBase}/page-all-by-search`, searchPagination);
    }

    /**
     * Guarda un rol
     * 
     * @param rol (Entidad RolModel)
     * @return RolModel guardado
     */
    public save(rol: RolModel): Observable<ResultadoProc<RolModel>> {
        return this.http.post<ResultadoProc<RolModel>>(`${this.urlBase}`, rol);
    }


    /**
     * Actualiza un rol
     * 
     * @param rol (Entidad RolModel)
     * @return RolModel actualizado
     */
    public update(rol: RolModel): Observable<ResultadoProc<RolModel>> {
        return this.http.put<ResultadoProc<RolModel>>(`${this.urlBase}`, rol);
    }

    /**
     * Cambia el estado del rol.
     * 
     * Si activo es true lo cambia a false. 
     * 
     * Si activo es false lo cambia a true.
     * 
     * @param rolId (Id del rol)
     * @return ResultadoProc&lt;RolModel&gt; El rol al que le fue cambiado el
     *         estado
     */
    public changeState(rolId: number): Observable<ResultadoProc<RolModel>> {
        return this.http.get<ResultadoProc<RolModel>>(`${this.urlBase}/change-state/${rolId}`);
    }

    /**
     * Busca un rol por su ID.
     * 
     * @param rolId (Identificador del rol)
     * @return RolModel con el ID dado
     */
    public findById(rolId: number): Observable<ResultadoProc<RolModel>> {
        return this.http.get<ResultadoProc<RolModel>>(`${this.urlBase}/${rolId}`);
    }

}
