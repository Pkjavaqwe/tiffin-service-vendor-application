import { SelectionModel } from '@angular/cdk/collections';
import { Component, Injector, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderValue } from '../../layout/orders/model/order';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  imports: [MatCheckboxModule, MatTableModule, MatCardModule, CommonModule, MatFormFieldModule, MatIconModule,MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  // @Input()
  // ordersDetails: OrderValue[] = [];
  // @Input() columns: any[] = [];
  // // @Input() columnDefs: any[] = [];  
  // // @Input() clickable: boolean = true;
  // displayedColumns: string[] = [];

  // constructor(private router: Router,private datePipe: DatePipe,private injector: Injector){}

  // applyPipe(value: any, pipeName: string) {
  //   if (pipeName === 'date') {
  //     const datePipe = new DatePipe('en-US'); 
  //     return datePipe.transform(value, 'shortDate');
  //   }
  //   return value;
  // }


  // dataSource = new MatTableDataSource<OrderValue>(this.ordersDetails);
  // selection = new SelectionModel<OrderValue>(true, []);

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['ordersDetails']) {
  //     this.dataSource.data = this.ordersDetails;
  //   }
  //   if (changes['columns']) {
  //     this.displayedColumns = this.columns.map(col => col.name); 
  //   }
  // }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // checkboxLabel(row?: OrderValue): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row._id + 1
  //   }`;
  // }

  // onRowClick(orderId: string) {
  //   this.router.navigate(['/order', orderId]);  
  // }


  @Input() columns: any[] = [];
  @Input() ordersDetails: any[] = [];
  @Input() columnDetails: any[] = [];
  // @Input() rowClickCallback: (row: any) => void = () => {}; 
  selectedRows: any[] = [];
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  routeUrl: string | undefined = "";
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.routeUrl = activeRoute.snapshot.routeConfig?.path
  }
  dataSource = new MatTableDataSource<OrderValue>(this.ordersDetails);

  ngOnInit() {
    this.displayedColumns = ['select', ...this.columns.map((column: any) => column.name)];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(col => col.name);
    }
    if (changes['ordersDetails']) {
      this.dataSource.data = this.ordersDetails;
      this.dataSource.data.length=this.ordersDetails.length
    }
    if (changes['columnDetails']) {
      this.dataSource.data = this.columnDetails;
    }

  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
  }

  onRowClick(row: any, id: any) {
    // if (this.rowClickCallback) {
    //   this.rowClickCallback(row); 
    // }
    if (this.routeUrl?.includes('product')) {
      console.log("in product row click");

      this.router.navigate(['/layout/product-view', id]);
    } else {
      console.log("in orders row click");

      this.router.navigate(['/layout/order', id]);

    }

  }

  applyPipe(value: any, pipeName: string) {
    if (pipeName === 'date') {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(value, 'shortDate');
    }
    return value;
  }

}
