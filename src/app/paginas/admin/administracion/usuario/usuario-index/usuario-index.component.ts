import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';
import { SearchService } from 'src/app/commons/services/search-input.service';
import { cambiarEstadoUsuario, listarUsuario } from 'src/app/store/actions/usuario.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.css']
})
export class UsuarioIndexComponent implements OnInit, OnDestroy {

  public listadoUsuarios = new Array<UsuarioModel>();

  private subscriptionUsuario: Subscription;
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
    this.appService.pageTitle = 'Usuarios';

    this.subscriptionUsuario = this.store.select('usuario').subscribe(state => {
      this.searchPagination = state.searchPagination;
      if (!state.loading && state.listadoUsuarios != null) {
        this.listadoUsuarios = state.listadoUsuarios.content;
        this.totalElements = state.listadoUsuarios.totalElements;
      }

      if (!state.saving && state.saved && state.usuario != null && state.success != null) {
        this.listarUsuarios();
      }
    });

    this.subscriptionSearch = this.searchService.search$.subscribe(search => {
      this.buscador = search;
      this.listarUsuarios();
    });

  }


  ngOnDestroy(): void {
    this.subscriptionUsuario.unsubscribe();
    this.subscriptionSearch.unsubscribe();
  }

  listarUsuarios() {
    this.searchPagination = {
      page: this.page,
      records: this.pageSize,
      seek: this.buscador,
      direction: this.direction,
      order: this.order
    }
    this.store.dispatch(listarUsuario({ searchPagination: this.searchPagination }));
  }

  changeState(usuarioId: number) {
    this.store.dispatch(cambiarEstadoUsuario({ usuarioId: usuarioId }));
  }

  editar(usuarioId: number) {
    this.router.navigate(['/admin/administracion/usuarios', usuarioId, 'edit']);
  }

  nuevo() {
    this.router.navigate(['/admin/administracion/usuarios/new']);
  }

  cancel() { }

  sortData(sort: any) {
    this.order = sort.active.toString().trim();
    this.direction = sort.direction.toString().trim();
    if (sort.direction.toString().trim() == '') {
      this.order = 'id';
      this.direction = 'desc';
    }
    this.listarUsuarios();
  }

  changePageSize(cantidadRegistros: number) {
    if (cantidadRegistros == 0) {
      cantidadRegistros = this.totalElements;
    }
    this.pageSize = cantidadRegistros;
    this.page = 1;
    this.listarUsuarios();
  }


}
