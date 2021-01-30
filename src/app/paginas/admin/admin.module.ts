import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { SidenavModule } from 'src/vendor/libs/sidenav/sidenav.module';

import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdministracionComponent } from './administracion/administracion.component';

@NgModule({
  declarations: [
    AdminIndexComponent,
    AdministracionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    NgbDropdownModule,
    CommonsServiceModule,
    QRCodeModule,
  ]
})
export class AdminModule { }
