import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';

const routes: Routes = [
  { path: 'usuarios', canLoad: [LoginGuard, RolAdminGuard], loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'productos', canLoad: [LoginGuard, RolAdminGuard], loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
