import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    OrdersModule,
    CustomersModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule,
    UserModule,
  ],
})
export class ComponentsModule {}
