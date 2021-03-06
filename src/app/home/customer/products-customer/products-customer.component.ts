import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AddNewComplaintService} from '../add-new-complaint/add-new-complaint.service';
import {IProduct} from '../../admin/products/all-products/all-products.component';

@Component({
  selector: 'app-purchases-customer',
  templateUrl: './products-customer.component.html',
  styleUrls: ['./products-customer.component.css']
})
export class ProductsCustomerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productID', 'productName', 'createdAt', 'category', 'details'];
  dataSource: MatTableDataSource<IProduct>;
  PRODUCTS_DATA: IProduct[];
  reqProductIDParent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public addNewComplaintService: AddNewComplaintService
  ) {
  }

  ngOnInit(): void {
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(false);
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/customer/get-all-products`, {}).subscribe(
      response => {
        console.log(response.data);
        this.PRODUCTS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IProduct>(this.PRODUCTS_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public clickAddComplaint(id: string): void {
    console.log(id);
    this.reqProductIDParent = id;
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(true);
  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: number): void {
    console.log(id);
  }

  // tslint:disable-next-line:typedef
  test(){

  }
}
