import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { AdministracionComponent } from './administracion.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
  declarations: [UsuarioComponent, ProductoComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    CommonsServiceModule
  ]
})
export class AdministracionModule { }
