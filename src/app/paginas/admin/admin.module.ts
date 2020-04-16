import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminIndexComponent } from './administracion/admin-index/admin-index.component';
import { AdministracionComponent } from './administracion/administracion.component';

@NgModule({
  declarations: [AdministracionComponent, AdminIndexComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
