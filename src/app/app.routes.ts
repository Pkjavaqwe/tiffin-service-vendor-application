import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TableComponent } from './shared/table/table.component';
import { OrderViewComponent } from './layout/orders/order-view/order-view.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProductComponent } from './layout/product/product.component';
import { ProductViewComponent } from './layout/product/product-view/product-view.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
  },
  {
    path: 'layout',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./layout/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./layout/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard]
      },
      { path: 'order/:id', component: OrderViewComponent },
      {
        path: 'product-view/:_id',
        loadComponent: () =>
          import('./layout/product/product-view/product-view.component').then(
            (m) => m.ProductViewComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'product-add',
        loadComponent: () =>
          import('./layout/product/product-view/product-view.component').then(
            (m) => m.ProductViewComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./layout/product/product.component').then(
            (m) => m.ProductComponent
          ),
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
