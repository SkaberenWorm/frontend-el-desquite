import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';

import { AppService } from '../../app.service';
import { LayoutService } from '../layout.service';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
}

// Menu Items
export let ROUTES: RouteInfo[] = [];
@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styles: [':host { display: block; }']
})
export class LayoutSidenavComponent implements AfterViewInit, OnInit {

  public menuItems: any[];

  @Input() orientation = 'vertical';

  private menuAdmin: RouteInfo[] = [
    {
      path: '/admin',
      title: 'Inicio',
      type: 'link',
      icontype: 'ion ion-ios-home',
    },
    {
      path: '',
      title: '',
      type: 'divider',
      icontype: '',
    },
    {
      path: '/admin/administracion',
      title: 'Administración',
      type: 'sub',
      icontype: 'ion ion-md-settings',
      collapse: 'settings',
      children: [
        { path: 'usuarios', title: 'Usuarios' },
        { path: 'roles', title: 'Roles' },
        { path: 'productos', title: 'Productos' },
      ]
    }

  ];

  private menuVendedor: RouteInfo[] = [
    {
      path: '/admin',
      title: 'Inicio',
      type: 'link',
      icontype: 'ion ion-ios-home',
    },
    {
      path: '',
      title: '',
      type: 'divider',
      icontype: '',
    },
    {
      path: '/admin/administracion',
      title: 'Administración',
      type: 'sub',
      icontype: 'ion ion-md-settings',
      collapse: 'settings',
      children: [
        { path: 'consultoras', title: 'Consultoras' },
      ]
    }
  ];

  @HostBinding('class.layout-sidenav') hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') hostClassFlex = false;

  constructor(
    private router: Router,
    private appService: AppService,
    private layoutService: LayoutService,
    private _authenticationService: AuthenticationService,
  ) {
    // Set host classes
    this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;

  }

  ngAfterViewInit() {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();
  }

  ngOnInit() {
    if (this._authenticationService.esRol('ROLE_ADMIN')) {
      ROUTES = this.menuAdmin;
    } else if (this._authenticationService.esRol('ROLE_VENDEDOR')) {
      ROUTES = this.menuVendedor;
    } else {
      this._authenticationService.logout();
    }

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  getClasses() {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuActive(url) {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }
}
