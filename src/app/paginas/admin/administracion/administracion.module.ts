import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { ProductoComponent } from './producto/producto.component';
import { RoleComponent } from './role/role.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    ProductoComponent,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    CommonsServiceModule,
  ]
})
export class AdministracionModule { }
