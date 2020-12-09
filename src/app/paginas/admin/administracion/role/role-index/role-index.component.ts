import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { RolModel } from 'src/app/commons/models/rol.model';
import { SearchService } from 'src/app/commons/services/search-input.service';
import { cambiarEstadoRol, listarRol } from 'src/app/store/actions/rol.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html',
  styleUrls: ['./role-index.component.css']
})
export class RoleIndexComponent implements OnInit, OnDestroy {

  public listadoRoles = new Array<RolModel>();

  private subscriptionRole: Subscription;
  private subscriptionSearch: Subscription;

  private searchPagination: SearchPagination<string>;

  public page = 1;
  public pageSize = 15;
  public totalElements = 0;
  public buscador = '';
  private order = 'id';
  private direction = 'desc';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private appService: AppService,
    private searchService: SearchService,
  ) {
    this.searchService.setSearch('');
  }

  ngOnInit() {
    this.appService.pageTitle = 'Roles';

    this.subscriptionRole = this.store.select('rol').subscribe(state => {
      if (!state.loading && state.listadoRoles != null) {
        this.listadoRoles = state.listadoRoles.content;
        this.totalElements = state.listadoRoles.totalElements;
      }

      if (!state.saving && state.saved && state.rol != null && state.success != null) {
        this.listarRoles();
      }
    });

    this.subscriptionSearch = this.searchService.search$.subscribe(search => {
      this.buscador = search;
      this.listarRoles();
    });

  }


  ngOnDestroy(): void {
    this.subscriptionRole?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }

  listarRoles() {
    this.searchPagination = {
      page: this.page,
      records: this.pageSize,
      seek: this.buscador,
      direction: this.direction,
      order: this.order
    }
    this.store.dispatch(listarRol({ searchPagination: this.searchPagination }));
  }

  changeState(rolId: number) {
    this.store.dispatch(cambiarEstadoRol({ rolId: rolId }));
  }

  editar(rol: RolModel) {
    this.router.navigate(['/admin/administracion/roles', rol.id, 'edit']);
  }

  nuevo() {

  }

  cancel() { }

  sortData(sort: any) {
    this.order = sort.active.toString().trim();
    this.direction = sort.direction.toString().trim();
    if (sort.direction.toString().trim() == '') {
      this.order = 'id';
      this.direction = 'desc';
    }
    this.listarRoles();
  }

  changePageSize(cantidadRegistros: number) {
    if (cantidadRegistros == 0) {
      cantidadRegistros = this.totalElements;
    }
    this.pageSize = cantidadRegistros;
    this.page = 1;
    this.listarRoles();
  }


}
