import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { LayoutService } from '../layout.service';

// import { InformacionBackendService } from 'src/app/commons/services/informacion-backend.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styles: [':host { display: block; }', ':host ::ng-deep .layout-loading .sidenav-link { transition: none !important; }']
})
export class LayoutAdminComponent implements AfterViewInit, OnDestroy, OnInit {

  public initialized = false;
  public isProduction = true;

  constructor(
    private layoutService: LayoutService,
    // private informacionBackendService: InformacionBackendService,
  ) { }
  ngOnInit() {
    // this.informacionBackendService.isProduction().subscribe(result => this.isProduction = result);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;

      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }

  closeSidenav() {
    setTimeout(() => {
      this.layoutService.setCollapsed(true);
    });
  }
}
