import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginIndexComponent } from './login-index/login-index.component';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { Ng2Rut } from 'ng2-rut';
@NgModule({
  declarations: [LoginIndexComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonsServiceModule,
    Ng2Rut
  ],
  providers: [LoginService]
})
export class LoginModule { }
