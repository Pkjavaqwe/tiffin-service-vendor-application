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
  // public chartOptions!: AgChartOptions;
  // public filter: 'weekly' | 'monthly' = 'monthly';

  // constructor() {
  //   // Initially load monthly data
  //   this.updateChartData();
  // }

  // // Method to toggle between weekly and monthly filters
  // toggleFilter(filter: 'weekly' | 'monthly') {
  //   this.filter = filter; // Set the filter to either 'weekly' or 'monthly'
  //   this.updateChartData(); // Update the chart data based on the selected filter
  // }

  // // Method to update chart data based on the selected filter
  // private updateChartData() {
  //   // Data for weekly view (weeks and corresponding values)
  //   const weeklyData = [
  //     { week: 'Week 1', totalOrders: 5, totalAmount: 500 },
  //     { week: 'Week 2', totalOrders: 10, totalAmount: 1000 },
  //     { week: 'Week 3', totalOrders: 15, totalAmount: 1500 },
  //     { week: 'Week 4', totalOrders: 20, totalAmount: 2000 },
  //   ];

  //   // Data for monthly view (months and corresponding values)
  //   const monthlyData = [
  //     { month: 'Jan', totalOrders: 10, totalAmount: 1000 },
  //     { month: 'Feb', totalOrders: 20, totalAmount: 2000 },
  //     { month: 'Mar', totalOrders: 30, totalAmount: 3000 },
  //     { month: 'Apr', totalOrders: 40, totalAmount: 4000 },
  //     { month: 'May', totalOrders: 50, totalAmount: 5000 },
  //   ];

  //   // Set the data based on the filter
  //   let chartData = [];
  //   if (this.filter === 'weekly') {
  //     chartData = weeklyData;  // Use weekly data if the filter is 'weekly'
  //   } else {
  //     chartData = monthlyData;  // Use monthly data if the filter is 'monthly'
  //   }

  //   // Update chart options dynamically
  //   this.chartOptions = {
  //     data: chartData,
  //     series: [
  //       {
  //         type: 'line',
  //         xKey: this.filter === 'weekly' ? 'week' : 'month', // x-axis will be 'week' or 'month' based on filter
  //         yKey: 'totalOrders',
  //         title: 'Total Orders',
  //       },
  //       {
  //         type: 'line',
  //         xKey: this.filter === 'weekly' ? 'week' : 'month', // x-axis will be 'week' or 'month' based on filter
  //         yKey: 'totalAmount',
  //         title: 'Total Amount',
  //       }
  //     ],
  //     title: {
  //       text: this.filter === 'weekly' ? 'Weekly Orders Overview' : 'Monthly Orders Overview',
  //       fontSize: 18,
  //       fontWeight: 'bold',
  //     },
  //     subtitle: {
  //       text: this.filter === 'weekly' ? 'Weekly Data for Orders and Amount' : 'Monthly Data for Orders and Amount',
  //       fontSize: 14,
  //     },
  //     axes: [
  //       {
  //         type: 'category',
  //         position: 'bottom',
  //         title: { text: this.filter === 'weekly' ? 'Week' : 'Month' },
  //       },
  //       {
  //         type: 'number',
  //         position: 'left',
  //         title: { text: 'Value' },
  //       }
  //     ],
  //     legend: {
  //       position: 'top',
  //     },
  //     tooltip: {
  //       enabled: true,
  //     }
  //   };
  // }

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
    private organizationService: OrganizationService
  ) {
    this.updateChartData();
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

  public ordersData: any;

  ngOnInit(): void {
    this.getOrders('week', 'pending', 2024);
    this.getAllOrganizations();
  }

  getOrders(filter: 'week' | 'month', status: string, year: number): void {
    this.orderService
      .getAllWeeklyAndMonthlyOrders(filter, status, year)
      .subscribe({
        next: (response: OrderApiResponse) => {
          console.log('Orders Data:', response.data);
          this.ordersData = response.data;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        },
      });
  }

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

  onRegisterClick(organizationId: string, location:string) {
    const token = sessionStorage.getItem('token');
    console.log("token",token);
    

    if (token) {
      const obs = this.organizationService.addRequest(organizationId,location);
      console.log('kahajhss', location);

      obs.subscribe(
        (response) => {
          console.log('Request added successfully', response);
          // this.snackBar.open('Request added successfully', 'Close', { duration: 2000 });
          alert("Request added successfully")
        },
        (error) => {
          console.error('Error adding request', error);
          // this.snackBar.open('Failed to add request', 'Close', { duration: 2000 });
          alert("Failed to add request")

        }
      );
    } else {
      // this.snackBar.open('No authentication token found', 'Close', { duration: 2000 });
    }
  }
}
