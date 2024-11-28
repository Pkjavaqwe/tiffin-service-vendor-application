import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { WeeklyMonthlyOrdersService } from './services/weekly-monthly-orders.service';
import { OrderApiResponse } from '../orders/model/order';
import { OrganizationService } from './services/organization.service';
import { Organization } from './model/organization';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    AgCharts,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatSliderModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public filter: 'weekly' | 'monthly' = 'monthly';
  public chartOptions!: AgChartOptions;
  organizationsArray: Organization[] = [];
  pageSize = 10;
  currentPage = 0;
  cardHeight: number = 300;
  cardWidth: number = 280;

  public weeklyData = [
    {
      startOfWeek: 'Jan 01 24',
      endOfWeek: 'Jan 07 24',
      totalOrders: 120,
      totalAmount: 5000,
    },
    {
      startOfWeek: 'Jan 08 24',
      endOfWeek: 'Jan 14 24',
      totalOrders: 110,
      totalAmount: 4500,
    },
    {
      startOfWeek: 'Jan 15 24',
      endOfWeek: 'Jan 21 24',
      totalOrders: 130,
      totalAmount: 5200,
    },
    {
      startOfWeek: 'Jan 22 24',
      endOfWeek: 'Jan 28 24',
      totalOrders: 125,
      totalAmount: 5100,
    },
  ];

  public monthlyData = [
    { month: '2024-01', totalOrders: 250, totalAmount: 10000 },
    { month: '2024-02', totalOrders: 280, totalAmount: 12000 },
    { month: '2024-03', totalOrders: 300, totalAmount: 13000 },
    { month: '2024-04', totalOrders: 320, totalAmount: 14000 },
  ];

  constructor(
    private orderService: WeeklyMonthlyOrdersService,
    private organizationService: OrganizationService,
    private authService: AuthService
  ) {
    this.updateChartData();
  }

  userStatus: string | null = null;
  getUserByToken() {
    const userByToken = this.authService.getUserTypeByToken();
    userByToken.subscribe({
      next: (userData) => {
        console.log("userdata", userData)
        // this.userStatus = userData.data.role_specific_details.approval_status;
        const approvalStatuses = userData.data.role_specific_details.approval.map(item => item.approval_status);
        console.log("approvalStatuses",approvalStatuses);
        
      },
      error: () => { },
    });
  }

  updateChartData() {
    if (this.filter === 'weekly') {
      this.chartOptions = {
        data: this.weeklyData.map((item) => ({
          week: `${item.startOfWeek} - ${item.endOfWeek}`,
          totalOrders: item.totalOrders,
          totalAmount: item.totalAmount,
        })),
        series: [
          {
            type: 'line',
            xKey: 'week',
            yKey: 'totalOrders',
            title: 'Total Orders',
          },
          {
            type: 'line',
            xKey: 'week',
            yKey: 'totalAmount',
            title: 'Total Amount',
          },
        ],
        title: {
          text:
            this.filter === 'weekly'
              ? 'Weekly Orders Overview'
              : 'Monthly Orders Overview',
          fontSize: 18,
          fontWeight: 'bold',
        },
      };
    } else {
      this.chartOptions = {
        data: this.monthlyData.map((item) => ({
          month: item.month,
          totalOrders: item.totalOrders,
          totalAmount: item.totalAmount,
        })),
        series: [
          {
            type: 'line',
            xKey: 'month',
            yKey: 'totalOrders',
            title: 'Total Orders',
          },
          {
            type: 'line',
            xKey: 'month',
            yKey: 'totalAmount',
            title: 'Total Amount',
          },
        ],
        title: {
          text:
            this.filter === 'monthly'
              ? 'Monthly Orders Overview'
              : 'Weekly Orders Overview',
          fontSize: 18,
          fontWeight: 'bold',
        },
      };
    }
  }

  toggleFilter(filter: 'weekly' | 'monthly') {
    this.filter = filter;
    this.updateChartData();
  }

  // public ordersData: any;

  // ngOnInit(): void {
  //   this.getOrders('week', 'pending', 2024);
  //   this.getAllOrganizations();
  // }

  // getOrders(filter: 'week' | 'month', status: string, year: number): void {
  //   this.orderService
  //     .getAllWeeklyAndMonthlyOrders(filter, status, year)
  //     .subscribe({
  //       next: (response: OrderApiResponse) => {
  //         console.log('Orders Data:', response.data);
  //         this.ordersData = response.data;
  //       },
  //       error: (error) => {
  //         console.error('Error fetching orders:', error);
  //       },
  //     });
  // }

  ordersData: any;

  ngOnInit(): void {
    this.getOrders('week', 'pending', 2024);
    this.getAllOrganizations();
    this.getUserByToken()
  }

  getOrders(filter: 'week' | 'month', status: string, year: number): void {
    this.orderService
      .getAllWeeklyAndMonthlyOrders(filter, status, year)
      .subscribe({
        next: (response: OrderApiResponse) => {
          console.log('Orders Data:', response.data);
          this.ordersData = response.data;
          this.updateChartData();
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        },
      });
  }

  // updateChartData(): void {
  //   if (this.filter === 'weekly') {
  //     this.chartOptions = {
  //       data: this.ordersData.map((item: any) => ({
  //         week: `${item.startOfWeek} - ${item.endOfWeek}`,
  //         totalOrders: item.totalOrders,
  //         totalAmount: item.totalAmount,
  //       })),
  //       series: [
  //         {
  //           type: 'line',
  //           xKey: 'week',
  //           yKey: 'totalOrders',
  //           title: 'Total Orders',
  //         },
  //         {
  //           type: 'line',
  //           xKey: 'week',
  //           yKey: 'totalAmount',
  //           title: 'Total Amount',
  //         },
  //       ],
  //       title: {
  //         text: 'Weekly Orders Overview',
  //         fontSize: 18,
  //         fontWeight: 'bold',
  //       },
  //     };
  //   } else {
  //     this.chartOptions = {
  //       data: this.ordersData.map((item: any) => ({
  //         month: item.month,
  //         totalOrders: item.totalOrders,
  //         totalAmount: item.totalAmount,
  //       })),
  //       series: [
  //         {
  //           type: 'line',
  //           xKey: 'month',
  //           yKey: 'totalOrders',
  //           title: 'Total Orders',
  //         },
  //         {
  //           type: 'line',
  //           xKey: 'month',
  //           yKey: 'totalAmount',
  //           title: 'Total Amount',
  //         },
  //       ],
  //       title: {
  //         text: 'Monthly Orders Overview',
  //         fontSize: 18,
  //         fontWeight: 'bold',
  //       },
  //     };
  //   }
  // }

  // toggleFilter(filter: 'weekly' | 'monthly'): void {
  //   this.filter = filter;
  //   this.updateChartData();
  // }

  getAllOrganizations(): void {
    this.organizationService.getAllOrganizationsApi().subscribe({
      next: (orgData) => {
        console.log('data', orgData.data);
        this.organizationsArray = orgData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRegisterClick(organizationId: string, location: string) {
    const token = sessionStorage.getItem('token');
    console.log('token', token);

    if (token) {
      const obs = this.organizationService.addRequest(organizationId, location);
      console.log('kahajhss', location);

      obs.subscribe(
        (response) => {
          console.log('Request added successfully', response);
          // this.snackBar.open('Request added successfully', 'Close', { duration: 2000 });
          alert('Request added successfully');
        },
        (error) => {
          console.error('Error adding request', error);
          // this.snackBar.open('Failed to add request', 'Close', { duration: 2000 });
          alert('Failed to add request');
        }
      );
    } else {
      // this.snackBar.open('No authentication token found', 'Close', { duration: 2000 });
    }
  }
}
