import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Menus } from './model/menus';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { SnackbarService } from '../shared/snackbar.service';
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
      icon: 'category',
    },

    {
      label: 'Logout',
      redirectURL: '/logout',
      icon: 'exit_to_app',
    },
  ];

  collapsed: boolean = false;
  image = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchUserProfileImage();
  }

  fetchUserProfileImage(): void {
    const adminDetails = this.authService.getUserTypeByToken();
    adminDetails.subscribe({
      next: (formData) => {
        console.log('profile details', formData.data);
        this.image = formData.data.user_image;
      },
    });
  }

  collapsedState() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

  sidenavWidth() {
    return this.collapsed ? '65px' : '250px';
  }

  logout() {
    sessionStorage.removeItem('token');
    this.snackBarService.showSuccess('Logged out successfully...');
    this.router.navigate(['/']);
  }

  updateProfile() {
    this.router.navigate(['/layout/profile-update']);
  }
}
