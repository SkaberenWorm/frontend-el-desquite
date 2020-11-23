import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoRoutingModule } from './producto-routing.module';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoFormComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    CommonsServiceModule,
    NgbPaginationModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    MatSortModule,
    MatTooltipModule,
  ]
})
export class ProductoModule { }
