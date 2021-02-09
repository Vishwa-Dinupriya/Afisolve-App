import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';

export interface IComplaint {
  complainID: string;
  description: string;
  finishedDate: string;
  lastDateOfPending: string;
  productID: string;
  status: string;
  subComplaintID: string;
  submittedDate: string;
  wipStartDate: string;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['description', 'status', 'submittedDate', 'productID', 'details', 'update', 'delete'];

  dataSource: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-complaints-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
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
