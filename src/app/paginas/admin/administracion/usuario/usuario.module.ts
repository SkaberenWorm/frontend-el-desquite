import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [UsuarioIndexComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CommonsServiceModule,
    NgbPaginationModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    MatSortModule,
    MatTooltipModule,
    NgbModule,
  ]
})
export class UsuarioModule { }
