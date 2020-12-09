import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { LoginService } from 'src/app/commons/services/login.service';
import { UtilValidation } from 'src/app/commons/util/util.validation';
import { autenticar, setAuthenticado } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: [
    '../../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginIndexComponent implements OnInit, OnDestroy {

  public formularioLogin: FormGroup;
  public formularioTwoFactor: FormGroup;
  public loading = false;
  private _subscription: Subscription;

  public visibleTwoFactorAuthentication = false;

  private usuario = '';
  private password = '';

  constructor(
    private appService: AppService,
    private store: Store<AppState>,
    private utilValidation: UtilValidation,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loginService: LoginService,
    private toasrt: ToastrService
  ) {
    this.appService.pageTitle = 'Login';
  }
  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.formularioTwoFactor = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });

    this._subscription = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;

      if (state.authenticate && !state.logout) {
        this.router.navigate(['/admin']);
      }

    });

    this.authenticationService.isLogin().then(
      (loEsta) => {
        if (loEsta) {
          this.store.dispatch(setAuthenticado({ usuario: this.authenticationService.obtenerUserName() }));
        }
      }
    );

  }

  verificarTwoFactor() {
    this.utilValidation.setFormForValidate(this.formularioTwoFactor);
    if (this.formularioTwoFactor.valid && !this.loading) {
      const code = this.formularioTwoFactor.controls.code.value;
      this.loginService.verificarTwoFactor(this.usuario, code).subscribe(result => {
        if (!result.error) {
          if (!result.resultado) {
            this.toasrt.error(result.mensaje);
          } else {
            this.store.dispatch(autenticar({ identificacion: { usuario: this.usuario, clave: this.password } }));
            this.usuario = this.password = '';
          }
        } else {
          this.toasrt.error(result.mensaje);
        }
      });
    }
  }

  login() {
    this.utilValidation.setFormForValidate(this.formularioLogin);
    if (this.formularioLogin.valid && !this.loading) {
      const usuario = this.formularioLogin.controls.email.value;
      const password = this.formularioLogin.controls.password.value;
      this.loading = true;
      this.loginService.login(usuario, password).subscribe(result => {
        if (!result.error) {
          if (result.resultado == null) {
            this.toasrt.error('No se encontró el usuario');
          } else {
            if (result.resultado.using2FA) {
              // this.toasrt.success('Usuario correcto, ingrese token para continuar');
              this.usuario = usuario;
              this.password = password;
              this.visibleTwoFactorAuthentication = true;
            } else {
              this.store.dispatch(autenticar({ identificacion: { usuario: usuario, clave: password } }));
            }
          }
        } else {
          this.toasrt.error(result.mensaje);
        }
        this.loading = false;
      });
    }
  }
}
