import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TableComponent } from './shared/table/table.component';
import { OrderViewComponent } from './layout/orders/order-view/order-view.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./layout/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      // {
      //   path: 'products',
      //   component:TableComponent
      // },
      { path: 'order/:id', component: OrderViewComponent },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
