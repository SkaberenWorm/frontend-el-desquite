import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BlockUIModule } from 'ng-block-ui';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

import { ThemeSettingsModule } from '../vendor/libs/theme-settings/theme-settings.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { extModules } from './build-specifics';
import { CommonsServiceModule } from './commons/commons-service.module';
import { LayoutModule } from './layout/layout.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginModule } from './paginas/login/login.module';
import { PasswordModule } from './paginas/password/password.module';
import { appReducers } from './store/app.reducer';
import { appEffect } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonsServiceModule,

    // App
    AppRoutingModule,
    LayoutModule,
    ThemeSettingsModule,

    // Libs
    ToastrModule.forRoot({
      toastClass: 'inline',
      preventDuplicates: true,
    }),
    ToastNoAnimationModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'default btn-sm',
      confirmButtonType: 'success btn-sm',
      cancelText: 'Cancelar',
      confirmText: 'Confirmar',
      focusButton: 'confirm',
    }),
    BlockUIModule.forRoot(),
    LoginModule,
    PasswordModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffect),
    NgbModule,
    extModules,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
  ],

  providers: [
    Title,
    AppService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
