import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CambiarPasswordService } from 'src/app/commons/services/cambiar-password.service';
import { Util } from 'src/app/commons/util/util';

@Component({
  selector: 'app-password-index',
  templateUrl: './password-index.component.html',
  styleUrls: [
    '../../../../vendor/styles/pages/authentication.scss'
  ]
})
export class PasswordIndexComponent implements OnInit {

  public title = '';
  private isNewPassword = false;
  private token = '';
  public formularioPassword: FormGroup;
  public loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private toastr: ToastrService,
    private cambiarPasswordService: CambiarPasswordService,
    private router: Router,
  ) {
    if (!(this.router.url.indexOf('crear-password') === -1)) {
      this.appService.pageTitle = 'Crea tu clave';
      this.title = 'Crea tu clave';
      this.isNewPassword = true;
    } else if (!(this.router.url.indexOf('cambiar-password') === -1)) {
      this.appService.pageTitle = 'Cambia tu clave';
      this.title = 'Cambia tu clave';
      this.isNewPassword = false;
    }

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

    if (this.isNewPassword) {
      this.cambiarPasswordService.validarTokenForNewPassword(this.token).subscribe(result => {
        if (result.error) {
          this.toastr.error(result.mensaje);
          this.router.navigate(['/']);
        }
      });
    } else {
      this.cambiarPasswordService.validarTokenForChangePassword(this.token).subscribe(result => {
        if (result.error) {
          this.toastr.error(result.mensaje);
          this.router.navigate(['/']);
        }
      });
    }

  }

  cambiar() {
    Util.setFormForValidate(this.formularioPassword);
    if (this.formularioPassword.valid && !this.loading) {
      const clave = this.formularioPassword.controls.password.value.trim();
      const confirmacion = this.formularioPassword.controls.passwordConfirm.value.trim();
      if (clave == confirmacion) {
        if (this.isNewPassword) {
          this.nuevaPassword(clave, confirmacion);
        } else {
          this.cambiarPassword(clave, confirmacion);
        }
      } else {
        this.toastr.warning('Las claves no coinciden');
      }
    }
  }

  cambiarPassword(clave: string, confirmacion: string) {
    this.cambiarPasswordService.cambiarPassword(this.token, { clave: clave, claveConfirm: confirmacion }).subscribe(result => {
      if (result.error) {
        this.toastr.error(result.mensaje);
      } else {
        this.toastr.success(result.mensaje);
      }
      this.router.navigate(['/login']);
    });
  }

  nuevaPassword(clave: string, confirmacion: string) {
    this.cambiarPasswordService.nuevaPassword(this.token, { clave: clave, claveConfirm: confirmacion }).subscribe(result => {
      if (result.error) {
        this.toastr.error(result.mensaje);
      } else {
        this.toastr.success(result.mensaje);
      }
      this.router.navigate(['/login']);
    });
  }

}
