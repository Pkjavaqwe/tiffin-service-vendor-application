import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, inject, Injector, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderValue } from '../../layout/orders/model/order';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-table',
  imports: [MatCheckboxModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggle,
    MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  onToggleChange(row: any) {
    row.isActive = !row.isActive;
    console.log(row);

  }
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
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() columns: any[] = [];
  @Input() ordersDetails: any[] = [];
  @Input() columnDetails: any[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output()
  pageChange = new EventEmitter<PageEvent>();
  @ViewChild(MatSort) sort!: MatSort;
  // @Input() rowClickCallback: (row: any) => void = () => {}; 
  selectedRows: any[] = [];
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  routeUrl: string | undefined = "";


  @Input()
  searchedQueryNotFound: string = "";
  // isChecked = true

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.routeUrl = activeRoute.snapshot.routeConfig?.path
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  dataSource = new MatTableDataSource<OrderValue>(this.ordersDetails);

  ngOnInit() {
    this.displayedColumns = ['select', ...this.columns.map((column: any) => column.name)];
    this.dataSource = new MatTableDataSource<any>(this.columnDetails);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.dataSource.data = this.columnDetails;
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(col => col.name);
    }
    if (changes['ordersDetails']) {
      this.dataSource.data = this.ordersDetails;
    }
    if (changes['columnDetails']) {
      this.dataSource.data = this.columnDetails;
    }

  }
  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
    console.log(" emit pageevent on change ", event);
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
    console.log("id on row click ---- ", id);

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
  announceSortChange(sortState: Sort) {
    console.log("sort direction ", sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }

}
