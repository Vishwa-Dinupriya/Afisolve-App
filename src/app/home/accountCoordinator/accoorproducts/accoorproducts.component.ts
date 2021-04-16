import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export interface IAll {
  productID: number;
  productName: string;
  category: string;
  CusName: string;
  // companyName: string;
  userEmail: string;
  contactNumber: number;
}

@Component({
  selector: 'app-accoorproducts',
  templateUrl: './accoorproducts.component.html',
  styleUrls: ['./accoorproducts.component.css']
})
// Displayed columns
export class AccoorproductsComponent implements OnInit {
  displayedProd: string[] = ['productID', 'productName', 'category', 'CusName', 'userEmail', 'contactNumber'];
  dataSourceProd: MatTableDataSource<IAll>;
  ALL_DATA: IAll[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-product-details`, {}).subscribe(
      response =>  {
        this.ALL_DATA = response.data;
        this.dataSourceProd = new MatTableDataSource<IAll>(this.ALL_DATA);
        this.dataSourceProd.sort = this.sort;
        this.dataSourceProd.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProd.filter = filterValue.trim().toLowerCase();
  }

}
