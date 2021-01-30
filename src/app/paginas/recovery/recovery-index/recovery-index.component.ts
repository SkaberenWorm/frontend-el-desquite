import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { UsuarioService } from 'src/app/commons/services/usuario.service';

@Component({
  selector: 'app-recovery-index',
  templateUrl: './recovery-index.component.html',
  styleUrls: [
    '../../../../vendor/styles/pages/authentication.scss'
  ]
})
export class RecoveryIndexComponent implements OnInit, OnDestroy {

  public formularioRecovery: FormGroup;
  public loading = false;
  private _subscription: Subscription;


  constructor(
    private appService: AppService,
    private usuarioService: UsuarioService,
    private toasrt: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = 'Recovery';
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  ngOnInit() {
    this.formularioRecovery = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });


  }

  recovery() {
    console.log('Recuperar contraseña');
    if (!this.loading) {
      this.loading = true;
      this.usuarioService.recoveryPassword(this.formularioRecovery.controls.email.value).subscribe(result => {
        if (!result.error) {
          this.toasrt.success('Se ha enviado un correo para recuperar su clave', '', { closeButton: true, disableTimeOut: true });
          this.router.navigate(['/login']);
        } else {
          this.toasrt.error(result.mensaje);
        }
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.loading = false;
      })
    } else {
      this.toasrt.warning('El proceso de recuperación esta en proceso');
    }

  }
}
