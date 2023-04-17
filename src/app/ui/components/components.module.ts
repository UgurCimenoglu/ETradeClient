import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PasswordUpdateModule } from './password-update/password-update.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    //LoginModule,
    PasswordResetModule,
    PasswordUpdateModule,
  ],
  exports: [BasketsModule],
})
export class ComponentsModule {}
