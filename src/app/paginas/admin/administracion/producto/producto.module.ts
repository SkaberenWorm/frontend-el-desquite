import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

@NgModule({
  declarations: [ProductoIndexComponent, ProductoFormComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    CommonsServiceModule,
    MatTooltipModule,
    NgbPaginationModule,
  ]
})
export class ProductoModule { }
