import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';

import { RecoveryIndexComponent } from './recovery-index/recovery-index.component';
import { RecoveryRoutingModule } from './recovery-routing.module';


@NgModule({
  declarations: [RecoveryIndexComponent],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CommonsServiceModule
  ]
})
export class RecoveryModule { }
