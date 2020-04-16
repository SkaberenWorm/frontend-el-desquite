import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilFormating } from 'src/app/commons/util/util.formating';
import { UtilValidation } from 'src/app/commons/util/util.validation';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import swal from 'sweetalert2';
import { Util } from 'src/app/commons/util/util';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Autenticar } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare const waitingDialog: any;
@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styles: []
})
export class LoginIndexComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public formLogin: FormGroup;
  private subscriptionStore: Subscription;

  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private element: ElementRef,
    private loginService: LoginService,
    private utilValidation: UtilValidation,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.subscriptionStore = this.store.select('auth').subscribe(state => {
      if (state.loading) {
        this.blockUI.start();
      } else {
        this.blockUI.stop();
      }
      if (state.authenticate) {
        if (this.authenticationService.esRol('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (this.authenticationService.esRol('ROLE_VENDEDOR')) {
          this.router.navigate(['/vendedor']);
        } else  {
          swal.fire({
            title: 'Error',
            text: 'No tiene los permisos suficientes para ingresar a esta plataforma',
            type: 'error'
          });
          this.authenticationService.logout();
        } 
      }
      if (state.error != null) {
        if (state.error.status === 400) {
          swal.fire({
            title: 'Error',
            text: state.error.error.error_description,
            type: 'error',
            allowOutsideClick: false
          });
        } else {
          swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar Identificarte',
            type: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      }
    });

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);

    this.formLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    if (this.subscriptionStore != null) {
      this.subscriptionStore.unsubscribe();
    }

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  login() {
    this.utilValidation.setFormForValidate(this.formLogin);
    if (this.formLogin.valid) {
      const usuario = this.formLogin.controls.usuario.value;
      const clave = this.formLogin.controls.clave.value;
      const tipo = '';

      const identificacion = {
        usuario: usuario,
        clave: clave,
        tipo: tipo
      };
      this.store.dispatch(new Autenticar(identificacion));
    }
  }
}
