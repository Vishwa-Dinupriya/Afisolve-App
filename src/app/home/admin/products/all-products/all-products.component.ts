import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';
import {ProductService} from '../product.service';

export interface IProduct {
  accountCoordinatorEmail: string;
  category: string;
  customerEmail: string;
  productID: number;
  productName: string;
  projectManagerEmail: string;
  createdAt: string;
}

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productID', 'productName', 'category', 'customerEmail', 'projectManagerEmail', 'accountCoordinatorEmail', 'details', 'delete'];
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
    this.productService.refreshNeededForAcName$
      .subscribe(() => {
        this.ngAfterViewInit();
      });
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-products`, {}).subscribe(
      response => {
        // console.log(response.data);
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
    // console.log(id);
    this.productService.ChangeProductIDSubjectNumberValue(id);
    this.productService.ChangeProductProfileModeBooleanSubjectValue(true);
  }

  public redirectToUpdate(id: number): void {
    console.log(id);
  }

  public redirectToDelete(id: number, complaintName: string): void {
    // console.log(id);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete this product: ',
        name: complaintName,
        button1: 'Cancel',
        button2: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-product`, {selectedProductID: id})
          .subscribe(
            response => {
              console.log(response);
              console.log('delete successfully!' + id);
              const dialogRef1 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'Product deleted Successfully!',
                  name: '',
                  button1: '',
                  button2: 'Done'
                }
              });
              this.ngAfterViewInit();
            },
            error => {
              console.log(error);
              console.log('error! delete not success! ' + id);
              const dialogRef1 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Failed!',
                  message: error,
                  name: '',
                  button1: '',
                  button2: 'Retry'
                }
              });
              this.ngAfterViewInit();
            });
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

}

