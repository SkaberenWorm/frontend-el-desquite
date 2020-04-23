import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { MatTooltipModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuarioIndexComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CommonsServiceModule,
    MatTooltipModule,
    NgbPaginationModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
