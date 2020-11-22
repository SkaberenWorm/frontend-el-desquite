import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/commons/services/usuario.service';
import { UtilAlert } from 'src/app/commons/util/util-alert';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { listarUsuario } from 'src/app/store/actions/usuario.actions';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.css']
})
export class UsuarioIndexComponent implements OnInit {

  public listadoUsuarios = new Array<UsuarioModel>();

  private searchPagination: SearchPagination<string>;



  public page = 1;
  public pageSize = 10;
  public totalElements = 0;

  public buscador = '';

  constructor(
    private usuarioService: UsuarioService,
    private alert: UtilAlert,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

    this.searchPagination = {
      page: this.page,
      records: this.pageSize,
      seek: this.buscador,
    }

    this.listarUsuarios();

    this.store.select('usuario').subscribe(state => {

      this.searchPagination = state.searchPagination;

      if (state.listadoUsuarios != null) {
        this.listadoUsuarios = state.listadoUsuarios.content;
        this.totalElements = state.listadoUsuarios.totalElements;
      }

    });

  }

  listarUsuarios() {

    this.store.dispatch(listarUsuario({ searchPagination: this.searchPagination }));
  }

  changeState(usuarioId: number) {
    this.usuarioService.changeState(usuarioId).subscribe(result => {
      if (!result.error) {
        this.alert.successSwal(result.mensaje);
        this.listarUsuarios();
      } else {
        this.alert.errorSwal(result.mensaje);
      }
    });
  }

  editar(usuarioId: number) {
    this.router.navigate(['/admin/administracion/usuario', usuarioId, 'edit']);
  }



}
