import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioIndexComponent,
    canLoad: [LoginGuard]
  },
  {
    path: ':id/edit',
    component: UsuarioFormComponent,
    canLoad: [LoginGuard]
  },
  {
    path: 'new',
    component: UsuarioFormComponent,
    canLoad: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
