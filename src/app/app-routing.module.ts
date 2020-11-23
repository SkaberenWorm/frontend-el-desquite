import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './commons/guards/login.guard';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LayoutBlankComponent, loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginModule) },
  { path: 'cambiar-password', component: LayoutBlankComponent, loadChildren: () => import('./paginas/password/password.module').then(m => m.PasswordModule) },
  { path: 'admin', canLoad: [LoginGuard], component: Layout2Component, loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminModule) },


  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true, relativeLinkResolution: 'legacy' }
    )],

  exports: [RouterModule]
})
export class AppRoutingModule { }
