import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { LoginIndexComponent } from './login-index/login-index.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginIndexComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CommonsServiceModule
  ]
})
export class LoginModule { }
