import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	private _search = new BehaviorSubject<string>('');
	search$ = this._search.asObservable();

	constructor() {
		this._search.next('');
	}

	/**
	 * Setea la busqueda y emite el valor a todos los subscritos
	 * @param value Valor de input
	 */
	setSearch(value: string) {
		this._search.next(value);
	}


}
