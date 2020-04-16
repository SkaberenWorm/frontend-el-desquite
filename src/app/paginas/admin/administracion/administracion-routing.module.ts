import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent,
    canLoad: [LoginGuard, RolAdminGuard],
    loadChildren: './usuario/usuario.module#UsuarioModule'
  },
  {
    path: 'producto',
    component: ProductoComponent,
    canLoad: [LoginGuard, RolAdminGuard],
    loadChildren: './producto/producto.module#ProductoModule'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
