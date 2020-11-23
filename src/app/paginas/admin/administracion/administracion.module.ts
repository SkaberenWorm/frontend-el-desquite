import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { ProductoComponent } from './producto/producto.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    CommonsServiceModule,
  ]
})
export class AdministracionModule { }
