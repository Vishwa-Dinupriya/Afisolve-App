import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {environment} from '../../../../environments/environment';

export interface IAllProd {
  productID: string;
  productName: string;
  category: string;
  projectManagerEmail: string;
  accountCoordinatorEmail: string;
}
export interface IAllMyProd {
  productID: string;
  productName: string;
  category: string;
  projectManagerEmail: string;
  accountCoordinatorEmail: string;
}

@Component({
  selector: 'app-devproducts',
  templateUrl: './devproducts.component.html',
  styleUrls: ['./devproducts.component.css']
})
export class DevproductsComponent implements OnInit {
  displayedProd: string[] = ['productID', 'productName', 'category', 'projectManagerName', 'projectManagerEmail', 'accountCoordinatorName', 'accountCoordinatorEmail'];
  dataSource1: MatTableDataSource<IAllProd>;
  ALLPRODUCTS_DATA: IAllProd[];
  dataSource2: MatTableDataSource<IAllMyProd>;
  ALLMYPRODUCTS_DATA: IAllMyProd[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) { }

  ngOnInit(): void {
    this.http1.post<any>(environment.developerApiUrl + `/get-devProducts-details`, {}).subscribe(
      response => {
        this.ALLPRODUCTS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IAllProd>(this.ALLPRODUCTS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
    this.http1.post<any>(environment.developerApiUrl + `/get-devMyProducts-details`, {}).subscribe(
      response => {
        this.ALLMYPRODUCTS_DATA = response.data;
        this.dataSource2 = new MatTableDataSource<IAllMyProd>(this.ALLMYPRODUCTS_DATA);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  applyFilterMyAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}
