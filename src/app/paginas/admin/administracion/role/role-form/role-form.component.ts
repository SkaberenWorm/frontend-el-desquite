import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { GrupoPrivilegioModel } from 'src/app/commons/models/grupo-privilegio.model';
import { RolModel } from 'src/app/commons/models/rol.model';
import { Util } from 'src/app/commons/util/util';
import { listarGrupoPrivilegio } from 'src/app/store/actions/grupo-privilegio.actions';
import { actualizarRol, buscarRol, guardarRol } from 'src/app/store/actions/rol.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styles: [
  ]
})
export class RoleFormComponent implements OnInit, OnDestroy {

  public rol = new RolModel();
  private subscriptionRol: Subscription;
  private subscriptionGrupoPrivilegio: Subscription;

  public accion = 'Editar';
  public isEdit = true;
  public saving = false;

  public listadoGrupoPrivilegio = new Array<GrupoPrivilegioModel>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private store: Store<AppState>,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.rol.id = params['id'];
      }
    });

  }

  public formulario: FormGroup;
  ngOnInit() {

    this.appService.pageTitle = 'Roles';

    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });

    if (this.rol.id > 0) {
      this.accion = 'Editar';
      this.isEdit = true;
      this.store.dispatch(buscarRol({ rolId: this.rol.id }));
    } else {
      this.accion = 'Nuevo';
      this.isEdit = false;
    }

    this.subscriptionRol = this.store.select('rol').subscribe(state => {
      this.saving = state.saving;
      if (!state.saving && state.saved && state.rol != null && state.success != null) {
        this.rol = new RolModel(state.rol);
        if (!this.isEdit) {
          // Si se guarda un nuevo rol, lo mandamos al listado
          this.rol = new RolModel();
          this.router.navigate(['/admin/administracion/roles']);
        }
      }

      if (!state.loading && state.rol != null) {
        this.rol = new RolModel(state.rol);
        this.loadForm();
      }
    });

    this.subscriptionGrupoPrivilegio = this.store.select('grupoPrivilegio').subscribe(state => {
      if (!state.loading && state.error == null && state.success == null && state.listadoGrupoPrivilegio == null) {
        this.store.dispatch(listarGrupoPrivilegio());
      }

      if (!state.loading && state.listadoGrupoPrivilegio != null) {
        this.listadoGrupoPrivilegio = state.listadoGrupoPrivilegio;
        console.log("this.listadoGrupoPrivilegio", this.listadoGrupoPrivilegio);
      }
    });

  }

  ngOnDestroy(): void {
    this.subscriptionRol?.unsubscribe();
    this.subscriptionGrupoPrivilegio?.unsubscribe();
  }

  /**
   * Carga el formulario con los datos del rol
   */
  loadForm() {
    this.formulario.controls.nombre.setValue(this.rol.nombre);
    this.formulario.controls.descripcion.setValue(this.rol.descripcion);
  }

  /**
   * Carga los datos del rol desde el formulario
   */
  loadRol() {
    this.rol = new RolModel(this.rol);
    this.rol.nombre = this.formulario.controls.nombre.value;
    this.rol.descripcion = this.formulario.controls.descripcion.value;
  }

  guardar() {
    if (!this.saving) {
      this.loadRol();
      Util.setFormForValidate(this.formulario);
      if (this.formulario.valid) {
        if (this.rol.id == 0) {
          this.save();
        } else {
          this.update();
        }
      } else {
        this.toastr.warning('formulario inválido');
      }
    } else {
      this.toastr.warning('El rol ya se esta guardando, favor espere...');
    }
  }

  save() {
    this.store.dispatch(guardarRol({ rol: this.rol }));
  }

  update() {
    this.store.dispatch(actualizarRol({ rol: this.rol }));
  }


  volver() {
    this.router.navigate(['/admin/administracion/roles']);
  }


  isValidFormControl(control: string): boolean {
    return this.formulario.controls[control].touched && this.formulario.controls[control].hasError('required')
  }



}
