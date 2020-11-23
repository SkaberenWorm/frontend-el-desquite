import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidenavModule } from '../../vendor/libs/sidenav/sidenav.module';
import { Layout2Component } from './layout-2/layout-2.component';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';
import { LayoutWithoutNavbarComponent } from './layout-without-navbar/layout-without-navbar.component';
import { LayoutService } from './layout.service';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule
  ],
  declarations: [
    Layout2Component,
    LayoutBlankComponent,
    LayoutNavbarComponent,
    LayoutFooterComponent,
    LayoutWithoutNavbarComponent,
    LayoutSidenavComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
