import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { setAuthenticado } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-layout-blank',
  templateUrl: './layout-blank.component.html',
  styles: [':host { display: block; }']
})
export class LayoutBlankComponent implements OnInit, OnDestroy {

  private _subscriptionOuth: Subscription;
  constructor(
    private _auth: AuthenticationService,
    private store: Store<AppState>,
    private router: Router,
  ) {


  }

  ngOnDestroy() {
    this._subscriptionOuth?.unsubscribe();
  }

  ngOnInit() {

    if (this.router.url.indexOf('cambiar-password') == -1) {
      this._auth.isLogin().then(
        (loEsta) => {
          if (loEsta) {
            this.store.dispatch(setAuthenticado({ usuario: this._auth.obtenerUserName() }));
            this._subscriptionOuth = this.store.select('auth').subscribe(state => {
              if (state.logout) {
                console.log('LayoutBlankComponent - logout()');
                this._auth.logout();
              }
            });
          }
        }
      );
    }
  }
}
