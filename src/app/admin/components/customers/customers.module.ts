import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'x', component: CustomersComponent },
    ]),
  ],
})
export class CustomersModule {}
