import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { WeeklyMonthlyOrdersService } from './services/weekly-monthly-orders.service';
import { OrderApiResponse } from '../orders/model/order';

@Component({
  selector: 'app-dashboard',
  imports: [AgCharts, MatButtonToggleModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
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


  public filter: 'weekly' | 'monthly' = 'monthly';  // Default value is 'monthly'
  public chartOptions!: AgChartOptions;

  // Example weekly data (this would come from your backend)
  public weeklyData = [
    { startOfWeek: 'Jan 01 24', endOfWeek: 'Jan 07 24', totalOrders: 120, totalAmount: 5000 },
    { startOfWeek: 'Jan 08 24', endOfWeek: 'Jan 14 24', totalOrders: 110, totalAmount: 4500 },
    { startOfWeek: 'Jan 15 24', endOfWeek: 'Jan 21 24', totalOrders: 130, totalAmount: 5200 },
    { startOfWeek: 'Jan 22 24', endOfWeek: 'Jan 28 24', totalOrders: 125, totalAmount: 5100 },
  ];

  // Example monthly data (this would come from your backend)
  public monthlyData = [
    { month: '2024-01', totalOrders: 250, totalAmount: 10000 },
    { month: '2024-02', totalOrders: 280, totalAmount: 12000 },
    { month: '2024-03', totalOrders: 300, totalAmount: 13000 },
    { month: '2024-04', totalOrders: 320, totalAmount: 14000 },
  ];

  constructor(private orderService: WeeklyMonthlyOrdersService) {
    this.updateChartData();
  }

  updateChartData() {
    if (this.filter === 'weekly') {
      this.chartOptions = {
        data: this.weeklyData.map(item => ({
          week: `${item.startOfWeek} - ${item.endOfWeek}`,  // Combine start and end dates for week label
          totalOrders: item.totalOrders,
          totalAmount: item.totalAmount
        })),
        series: [
          { type: 'line', xKey: 'week', yKey: 'totalOrders', title: 'Total Orders' },
          { type: 'line', xKey: 'week', yKey: 'totalAmount', title: 'Total Amount' }
        ],       title: {
                text: this.filter === 'weekly' ? 'Weekly Orders Overview' : 'Monthly Orders Overview',
                fontSize: 18,
                fontWeight: 'bold',
              },
              // subtitle: {
              //   text: this.filter === 'weekly' ? 'Weekly Data for Orders and Amount' : 'Monthly Data for Orders and Amount',
              //   fontSize: 14,
              // },
              
      };
    } else {
      this.chartOptions = {
        data: this.monthlyData.map(item => ({
          month: item.month,  // Directly use the month for x-axis
          totalOrders: item.totalOrders,
          totalAmount: item.totalAmount
        })),
        series: [
          { type: 'line', xKey: 'month', yKey: 'totalOrders', title: 'Total Orders' },
          { type: 'line', xKey: 'month', yKey: 'totalAmount', title: 'Total Amount' }
        ],
        title: {
          text: this.filter === 'monthly' ? 'Monthly Orders Overview' : 'Weekly Orders Overview',
          fontSize: 18,
          fontWeight: 'bold',
        },
        // subtitle: {
        //   text: this.filter === 'monthly' ? 'Monthly Data for Orders and Amount' : 'Weekly Data for Orders and Amount',
        //   fontSize: 14,
        // },
      };
    }
  }


  

  toggleFilter(filter: 'weekly' | 'monthly') {
    this.filter = filter;
    this.updateChartData();  // Update chart data based on the selected filter
  }

  



  public ordersData: any;  // Data to store the orders response

  // constructor(private orderService: WeeklyMonthlyOrdersService) {}

  ngOnInit(): void {
    // Call the service method with required parameters
    this.getOrders('week', 'pending', 2024);
  }

  getOrders(filter: 'week' | 'month', status: string, year: number): void {
    this.orderService.getAllWeeklyAndMonthlyOrders(filter, status, year).subscribe({
      next: (response: OrderApiResponse) => {
        // Handle the response
        console.log('Orders Data:', response.data);
        this.ordersData = response.data;  // Adjust this as per the actual response structure
      },
      error: (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    });
  }
}
