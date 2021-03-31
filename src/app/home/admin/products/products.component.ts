import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


export interface IProduct {
  accountCoordinatorEmail: string;
  category: string;
  customerEmail: string;
  productID: string;
  productName: string;
  projectManagerEmail: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productID', 'productName', 'category', 'customerEmail', 'projectManagerEmail', 'accountCoordinatorEmail', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<IProduct>;
  PRODUCTS_DATA: IProduct[];

  createProduct = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-products-details`, {}).subscribe(
      response => {
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

  public redirectToDetails(id: string): void {
    console.log(id);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
  }

}
