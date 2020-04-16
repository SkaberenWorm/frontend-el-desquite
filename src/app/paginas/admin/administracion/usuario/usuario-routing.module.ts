import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UsuarioIndexComponent,
    canLoad: [LoginGuard, RolAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
