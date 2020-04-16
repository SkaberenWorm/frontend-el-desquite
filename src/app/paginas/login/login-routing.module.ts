import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginIndexComponent } from './login-index/login-index.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
