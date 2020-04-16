import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    loadChildren: './paginas/login/login.module#LoginModule'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: './paginas/admin/admin.module#AdminModule'
  },
  
];
