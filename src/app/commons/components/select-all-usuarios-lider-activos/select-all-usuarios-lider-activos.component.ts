import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-select-all-usuarios-lider-activos',
  templateUrl: './select-all-usuarios-lider-activos.component.html',
  styles: [
  ]
})
export class SelectAllUsuariosLiderActivosComponent implements OnInit {

  public disabled = false;
  public selectOptions: Array<UsuarioModel> = [];


  @Input() usuario: UsuarioModel;
  public usuarioId: number;

  @Output() usuarioSeleccionado = new EventEmitter<UsuarioModel>();

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {

    if (this.usuario != null) {
      this.usuarioId = this.usuario.id;
    }

    this.usuarioService.findAllLideresActivos().subscribe(result => {
      if (!result.error) {
        this.selectOptions = result.resultado;
      } else {
        this.toastr.error(result.mensaje);
      }
    });
  }

  changeUsuario() {
    this.usuarioSeleccionado.emit(this.selectOptions.filter(usuario => usuario.id == this.usuarioId)[0]);
  }

}
