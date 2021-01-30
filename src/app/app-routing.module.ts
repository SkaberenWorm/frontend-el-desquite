import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './commons/guards/login.guard';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LayoutBlankComponent, loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginModule) },
  { path: 'recovery', component: LayoutBlankComponent, loadChildren: () => import('./paginas/recovery/recovery.module').then(m => m.RecoveryModule) },
  { path: 'cambiar-password', component: LayoutBlankComponent, loadChildren: () => import('./paginas/password/password.module').then(m => m.PasswordModule) },
  { path: 'crear-password', component: LayoutBlankComponent, loadChildren: () => import('./paginas/password/password.module').then(m => m.PasswordModule) },
  { path: 'admin', canLoad: [LoginGuard], component: LayoutAdminComponent, loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminModule) },
  { path: 'profile', canLoad: [LoginGuard], loadChildren: () => import('./paginas/profile/profile.module').then(m => m.ProfileModule) },


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
