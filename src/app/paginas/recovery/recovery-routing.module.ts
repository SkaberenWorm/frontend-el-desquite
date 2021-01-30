import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecoveryIndexComponent } from './recovery-index/recovery-index.component';


const routes: Routes = [
  {
    path: '',
    component: RecoveryIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryRoutingModule { }
