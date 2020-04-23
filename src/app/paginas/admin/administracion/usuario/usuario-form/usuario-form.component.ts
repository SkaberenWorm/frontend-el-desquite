import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';
import { UsuarioService } from 'src/app/commons/services/usuario.service';
import { PrivilegioModel } from 'src/app/commons/models/privilegio.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  private usuario: UsuarioModel = new UsuarioModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.usuario.id = params['id'];
      }
    });
  }

  public formulario: FormGroup;
  ngOnInit() {
    this.formulario = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      activo: new FormControl('', [Validators.required]),
    });

    if (this.usuario.id > 0) {
      this.usuarioService.findById(this.usuario.id).subscribe(
        result => {
          this.usuario = result.resultado;
          this.loadForm();
        }
      );
    } else {
      this.router.navigate(['/admin/administracion/usuario']);
    }
  }

  /**
   * Carga el formulario con los datos del usuario
   */
  loadForm() {
    this.formulario.controls.id.setValue(this.usuario.id);
    this.formulario.controls.nombre.setValue(this.usuario.nombre);
    this.formulario.controls.apellidos.setValue(this.usuario.apellidos);
    this.formulario.controls.email.setValue(this.usuario.email);
    this.formulario.controls.activo.setValue(this.usuario.activo);
  }

  /**
   * Carga los datos del usuario desde el formulario
   */
  loadUsuario() {
    this.usuario.id = this.formulario.controls.id.value();
    this.usuario.nombre = this.formulario.controls.nombre.value();
    this.usuario.apellidos = this.formulario.controls.apellidos.value();
    this.usuario.email = this.formulario.controls.email.value();
    this.usuario.activo = this.formulario.controls.activo.value();
  }

  guardar() {
    console.log('Guardar');
  }

  agregarRol() {
    console.log('Agregar rol');
  }

  eliminarRol(rolId: number) {
    console.log('Eliminar rol ' + rolId);
  }


  volver() {
    this.router.navigate(['/admin/administracion/usuario']);
  }

}
