import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
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
  public loading = false;
  private _subscription: Subscription;

  constructor(
    private appService: AppService,
    private store: Store<AppState>,
    private utilValidation: UtilValidation,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.appService.pageTitle = 'Login';
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  ngOnInit() {
    this.formularioLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
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

  login() {
    this.utilValidation.setFormForValidate(this.formularioLogin);
    if (this.formularioLogin.valid && !this.loading) {
      const usuario = this.formularioLogin.controls.email.value;
      const password = this.formularioLogin.controls.password.value;
      this.store.dispatch(autenticar({ identificacion: { usuario: usuario, clave: password } }));
    }
  }
}
