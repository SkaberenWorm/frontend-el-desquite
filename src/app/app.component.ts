import { Component, OnInit } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { AppService } from './app.service';
import { AuthenticationService } from './commons/services/authentication.service';
import { LayoutService } from './layout/layout.service';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host { display: block; }']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private appService: AppService,
    private layoutService: LayoutService,
    private _authenticationService: AuthenticationService,
    private _store: Store<AppState>
  ) {
    // Subscribe to router events to handle page transition
    this.router.events.subscribe(this.navigationInterceptor.bind(this));

    // Disable animations and transitions in IE10 to increase performance
    if (typeof (document as any).documentMode === 'number' && (document as any).documentMode < 11) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
      document.head.appendChild(style);
    }
  }

  ngOnInit() {
    // this._authenticationService.isLogin().then(isLogin => {
    //   if (isLogin) {
    //     this._store.dispatch(setAuthenticado({ usuario: this._authenticationService.persona.nombreCompleto }));
    //     this._store.dispatch(setOrganizacionSuccess({ organizacion: this._organizacionService.getOrganizacion() }));
    //     this._store.dispatch(setPersona());
    //   }
    // }
    // );
  }

  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
      // Set loading state
      document.body.classList.add('app-loading');
    }

    if (e instanceof NavigationEnd) {
      // Scroll to top of the page
      this.appService.scrollTop(0, 0);
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      // On small screens collapse sidenav
      if (this.layoutService.isSmallScreen() && !this.layoutService.isCollapsed()) {
        setTimeout(() => this.layoutService.setCollapsed(true, true), 10);
      }

      // Remove loading state
      document.body.classList.remove('app-loading');

      // Remove initial splash screen
      const splashScreen = document.querySelector('.app-splash-screen');
      if (splashScreen) {
        (splashScreen as any).style.opacity = 0;
        setTimeout(() =>
          splashScreen && splashScreen.parentNode && splashScreen.parentNode.removeChild(splashScreen)
          , 300);
      }
    }
  }
}
