import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { LoginGuard } from './guards/login.guard';
import { RolAdminGuard } from './guards/rol-admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { Util } from './util/util';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolAdminOrVendedorGuard } from './guards/rol-admin-or-vendedor.guard';
import { UtilAlert } from './util/util-alert';
import { UsuarioService } from './services/usuario.service';
import { ProductoService } from './services/producto.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BlockUIModule,
    BlockUIHttpModule,
    NgbPaginationModule,
    NgbModalModule,
    MatSelectModule,
    MatInputModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
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
    LoginGuard,
    RolAdminGuard,
    RolAdminOrVendedorGuard,
    AuthGuard,
    Util,
    UtilFormating,
    UtilValidation,
    UtilAlert,
    UsuarioService,
    ProductoService,
  ],
  exports: []
})
export class CommonsServiceModule {}
