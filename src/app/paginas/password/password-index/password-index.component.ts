import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CambiarPasswordService } from 'src/app/commons/services/cambiar-password.service';
import { Util } from 'src/app/commons/util/util';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-password-index',
  templateUrl: './password-index.component.html',
  styleUrls: [
    '../../../../vendor/styles/pages/authentication.scss'
  ]
})
export class PasswordIndexComponent implements OnInit {

  private token = '';
  public formularioPassword: FormGroup;
  public loading = false;
  // http://localhost:4200/cambiar-password/d53dfb69-bf91-4dd3-bfb9-01aff8739710
  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private store: Store<AppState>,
    private toastr: ToastrService,
    private cambiarPasswordService: CambiarPasswordService,
    private router: Router,
  ) {
    this.appService.pageTitle = 'Cambia tu clave';

    this.activatedRoute.params.subscribe(params => {
      if (params['token'] != undefined) {
        this.token = params['token'];
      } else {
        this.toastr.warning('No se encuentra el token por parámetro');
      }
    });

  }
  ngOnDestroy() {
  }

  ngOnInit() {
    this.formularioPassword = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', Validators.required)
    });

    this.cambiarPasswordService.validarToken(this.token).subscribe(result => {
      if (result.error) {
        this.toastr.error(result.mensaje);
        this.router.navigate(['/']);
      }
    });
  }

  cambiar() {
    Util.setFormForValidate(this.formularioPassword);
    if (this.formularioPassword.valid && !this.loading) {
      const clave = this.formularioPassword.controls.password.value.trim();
      const confirmacion = this.formularioPassword.controls.passwordConfirm.value.trim();
      if (clave == confirmacion) {
        this.cambiarPasswordService.cambiarPassword(this.token, { clave: clave, claveConfirm: confirmacion }).subscribe(result => {
          if (result.error) {
            this.toastr.error(result.mensaje);
          } else {
            this.toastr.success(result.mensaje);
          }
          this.router.navigate(['/login']);
        });
      } else {
        this.toastr.warning('Las claves no coinciden');
      }
    }
  }
}
