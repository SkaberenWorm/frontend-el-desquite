import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { SearchService } from 'src/app/commons/services/search-input.service';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = false;
  isRTL: boolean;

  public nombreUsuario = '';
  public searchText = '';
  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(
    private appService: AppService,
    private layoutService: LayoutService,
    private _auth: AuthenticationService,
    private searchService: SearchService,
  ) {
    this.isRTL = appService.isRTL;
  }

  ngOnInit() {
    this.nombreUsuario = this._auth.obtenerName();
    this.searchService.search$.subscribe(value => this.searchText = value);
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout() {
    this._auth.logout();
  }

  search(_value: string) {
    this.searchService.setSearch(_value);
  }
}
