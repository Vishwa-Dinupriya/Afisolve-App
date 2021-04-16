import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {environment} from '../../../../environments/environment';


export interface IAll {
  productID: number;
  productName: string;
  DevName: string;
  developerEmail: string;
  contactNumber: number;
}

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {
  displayedAllo: string[] = ['productID', 'productName', 'DevName', 'developerEmail', 'contactNumber'];
  dataSourceAllo: MatTableDataSource<IAll>;
  ALL_DATA: IAll[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(environment.accountCoordinatorApiUrl + `/get-allocation-details`, {}).subscribe(
      response =>  {
        this.ALL_DATA = response.data;
        this.dataSourceAllo = new MatTableDataSource<IAll>(this.ALL_DATA);
        this.dataSourceAllo.sort = this.sort;
        this.dataSourceAllo.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
  }

  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAllo.filter = filterValue.trim().toLowerCase();
  }

}
