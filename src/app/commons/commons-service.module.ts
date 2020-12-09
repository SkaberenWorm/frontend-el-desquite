import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SidenavModule } from 'src/vendor/libs/sidenav/sidenav.module';

import { MultiSelectRolActivoComponent } from './components/multi-select-rol-activo/multi-select-rol-activo.component';
import {
  SelectAllUsuariosLiderActivosComponent,
} from './components/select-all-usuarios-lider-activos/select-all-usuarios-lider-activos.component';
import { TextBtnComponent } from './components/text-btn/text-btn.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RolAdminLiderGuard } from './guards/rol-admin-lider.guard';
import { RolAdminGuard } from './guards/rol-admin.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { UtilAlert } from './util/util.alert';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';

@NgModule({
  declarations: [
    MultiSelectRolActivoComponent,
    SelectAllUsuariosLiderActivosComponent,
    TextBtnComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbDropdownModule,
    SidenavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    NgSelectModule
  ],
  providers: [AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    UtilFormating,
    UtilValidation,
    UtilAlert,

    LoginGuard,
    RolAdminGuard,
    AuthGuard,
    RolAdminLiderGuard,
  ],
  exports: [
    MultiSelectRolActivoComponent,
    SelectAllUsuariosLiderActivosComponent,
    TextBtnComponent
  ]
})
export class CommonsServiceModule { }
