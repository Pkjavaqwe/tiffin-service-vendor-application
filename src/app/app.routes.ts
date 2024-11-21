import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'navbar',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
