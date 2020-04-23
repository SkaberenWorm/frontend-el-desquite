import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RolService {

	private urlBase = `${environment.backend_url}api/rol`;
	constructor(private http: HttpClient) { }


}
