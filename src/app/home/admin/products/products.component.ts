import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../shared/dialog-box/dialog-box.component';
import {ProductService} from './product.service';


export interface IProduct {
  accountCoordinatorEmail: string;
  category: string;
  customerEmail: string;
  productID: number;
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
              private http1: HttpClient,
              private dialog: MatDialog,
              public productService: ProductService) {
    this.productService.createProductModeBooleanSubject.subscribe(value => this.ngAfterViewInit()); // next eken enne methnata

  }

  ngOnInit(): void {
    this.productService.ChangeCreateProductModeBooleanSubjectValue(false);
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-products`, {}).subscribe(
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

  public redirectToDetails(id: number): void {
    console.log(id);
  }

  public redirectToUpdate(id: number): void {
    console.log(id);
  }

  public redirectToDelete(id: number): void {
    console.log(id);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete this product: ',
        name: id,
        button1: 'Cancel',
        button2: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-product`, {selectedProductID: id})
          .subscribe(
            response => {
              console.log(response);
              console.log('delete successfully!' + id);
              this.ngAfterViewInit();
            },
            error => {
              console.log(error);
              console.log('error! delete not success! ' + id);
              this.ngAfterViewInit();
            });
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  changeMode(value: boolean): void {
    this.productService.ChangeCreateProductModeBooleanSubjectValue(!value);
    this.createProduct = value;
    this.ngAfterViewInit();
  }

}
