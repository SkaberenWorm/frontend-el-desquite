import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { RolModel } from 'src/app/commons/models/rol.model';
import { UsuarioModel } from 'src/app/commons/models/usuario.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Util } from 'src/app/commons/util/util';
import {
  actualizarUsuario,
  buscarUsuario,
  crearTokenParaCambiarPassword,
  guardarUsuario,
} from 'src/app/store/actions/usuario.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit, OnDestroy {

  public usuario = new UsuarioModel();
  private subscriptionUsuario: Subscription;

  public accion = 'Editar';
  public isEdit = true;
  public userLoad = false;
  public saving = false;

  public isAdmin = false;

  public creandoToken = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private auth: AuthenticationService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.usuario.id = params['id'];
      }
    });

  }

  public formulario: FormGroup;
  ngOnInit() {
    if (this.auth.esRol('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
    this.appService.pageTitle = 'Usuarios';

    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

    if (this.usuario.id > 0) {
      this.accion = 'Editar';
      this.isEdit = true;
      this.store.dispatch(buscarUsuario({ usuarioId: this.usuario.id }));
    } else {
      this.accion = 'Nuevo';
      this.isEdit = false;
      this.userLoad = true;
    }

    this.subscriptionUsuario = this.store.select('usuario').subscribe(state => {
      this.saving = state.saving;
      if (!state.saving && state.saved && state.usuario != null && state.success != null) {
        this.usuario = new UsuarioModel(state.usuario);
        if (!this.isEdit) {
          // Si se guarda un nuevo usuario, lo mandamos al listado
          this.usuario = new UsuarioModel();
          this.router.navigate(['/admin/administracion/usuarios']);
        }
      }

      if (!state.loading && state.tokenCreado && state.success != null) {
        this.creandoToken = false;
      }

      if (!state.loading && !state.tokenCreado && state.error != null) {
        this.creandoToken = false;
      }

      if (!state.loading && state.usuario != null) {
        this.usuario = new UsuarioModel(state.usuario);
        this.loadForm();
        this.userLoad = true;
      }
    });

  }

  ngOnDestroy(): void {
    this.subscriptionUsuario?.unsubscribe();
  }

  /**
   * Carga el formulario con los datos del usuario
   */
  loadForm() {
    this.formulario.controls.nombre.setValue(this.usuario.nombre);
    this.formulario.controls.apellidos.setValue(this.usuario.apellidos);
    this.formulario.controls.email.setValue(this.usuario.email);
  }

  /**
   * Carga los datos del usuario desde el formulario
   */
  loadUsuario() {
    this.usuario = new UsuarioModel(this.usuario);
    this.usuario.nombre = this.formulario.controls.nombre.value;
    this.usuario.apellidos = this.formulario.controls.apellidos.value;
    this.usuario.email = this.formulario.controls.email.value;
  }

  guardar() {
    if (!this.saving) {
      this.loadUsuario();
      Util.setFormForValidate(this.formulario);
      if (this.formulario.valid) {
        if (this.usuario.id == 0) {
          this.save();
        } else {
          this.update();
        }
      } else {
        this.toastr.warning('formulario inválido');
      }
    } else {
      this.toastr.warning('El usuario ya se esta guardando, favor espere...');
    }
  }

  save() {
    this.store.dispatch(guardarUsuario({ usuario: this.usuario }));
  }

  update() {
    this.store.dispatch(actualizarUsuario({ usuario: this.usuario }));
  }


  volver() {
    this.router.navigate(['/admin/administracion/usuarios']);
  }



  rolesSeleccionados(roles: Array<RolModel>) {
    console.log("roles", roles);
    this.usuario = new UsuarioModel(this.usuario);
    for (let index = 0; index < roles.length; index++) {
      roles[index] = new RolModel({ id: roles[index].id });
    }
    console.log("roles", roles);
    this.usuario.roles = roles != null ? roles : new Array<RolModel>();
    if (this.usuario.id != 0) {
      // Guardamos el usuario cada vez que hay un cambio solo cuando se esta editando el usuario
      this.guardar();
    }
  }



  isValidFormControl(control: string): boolean {
    return this.formulario.controls[control].touched && this.formulario.controls[control].hasError('required')
  }


  createToken() {
    if (!this.creandoToken) {
      this.creandoToken = true;
      this.store.dispatch(crearTokenParaCambiarPassword({ usuario: this.usuario }));
    }
  }

}
