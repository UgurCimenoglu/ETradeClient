import { HomeComponent } from './ui/components/home/home.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'authorize-menu',
        loadChildren: () =>
          import(
            './admin/components/authorize-menu/authorize-menu.module'
          ).then((module) => module.AuthorizeMenuModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./admin/components/role/role.module').then(
            (module) => module.RoleModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin/components/user/user.module').then(
            (module) => module.UserModule
          ),
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard], //AuthGuard'ın içindeki logicler sağlandığı sürece bu objedeki routelere erişebileceğiz. AuthGuard bize true veya false dönecek
  },
  { path: '', component: HomeComponent },
  {
    path: 'basket',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'products/:pageNo',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: 'password-reset',
    loadChildren: () =>
      import('./ui/components/password-reset/password-reset.module').then(
        (module) => module.PasswordResetModule
      ),
  },
  {
    path: 'update-password/:userId/:resetToken',
    loadChildren: () =>
      import('./ui/components/password-update/password-update.module').then(
        (module) => module.PasswordUpdateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
