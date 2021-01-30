import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { TwoFactorAuthenticationService } from 'src/app/commons/services/two-factor-authentication.service';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: [
    // '../../../../vendor/styles/pages/authentication.scss',
    '../../../../vendor/styles/pages/contacts.scss',
    './admin-index.component.css'
  ]
})
export class AdminIndexComponent implements OnInit, OnDestroy {

  isExpanded = false;
  isRTL: boolean;
  public search = '';
  public imageQr: string;

  constructor(
    private appService: AppService,
    private store: Store<AppState>,
    private twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private toasrt: ToastrService
  ) {
    this.appService.pageTitle = 'Home';
    this.isRTL = appService.isRTL;
  }

  ngOnDestroy() {
  }


  ngOnInit(): void {

  }

  logout() {
    this.store.dispatch(logout());
  }

  buscar(search: string) {
    this.search = search;
  }

  generateCodeQr2FA() {
    this.twoFactorAuthenticationService.generateCode().subscribe(result => {
      if (!result.error) {
        this.imageQr = result.resultado;
      } else {
        this.toasrt.error(result.mensaje);
      }
    }, (_) => this.toasrt.error('Se produjo un error al intentar generar al código QR'));
  }



}
