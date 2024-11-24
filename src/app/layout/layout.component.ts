import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Menus } from './model/menus';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menus: Menus[] = [
    {
      label: `Dashboard`,
      redirectURL: '/layout/dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Orders',
      redirectURL: '/layout/orders',
      icon: 'check_circle',
    },
    {
      label: 'Products',
      redirectURL: '/layout/product',
      icon: 'add_circle_outline',
    },

    {
      label: 'Logout',
      redirectURL: '/logout',
      icon: 'exit_to_app',
    },
  ];

  collapsed: boolean = false;

  constructor(private router: Router) { }

  collapsedState() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

  sidenavWidth() {
    return this.collapsed ? '65px' : '250px';
  }

  logout() {
    sessionStorage.removeItem('token');
    window.alert('Logged out successfully...');
    this.router.navigate(['/']);
  }
}
