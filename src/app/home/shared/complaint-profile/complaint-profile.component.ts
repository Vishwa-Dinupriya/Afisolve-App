import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ComplaintsService} from '../../admin/complaints/complaints.service';

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
  selector: 'app-complaint-profile',
  templateUrl: './complaint-profile.component.html',
  styleUrls: ['./complaint-profile.component.css']
})
export class ComplaintProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() complaintIdChild: string;

  displayedColumns: string[] = ['description', 'status', 'submittedDate', 'productID', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  tabIndex;

  test = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public complaintService: ComplaintsService) {
  }

  ngOnChanges(): void {
    if (this.complaintIdChild) {
      this.tabIndex = '1';
      this.http1.post<any>(`http://localhost:3000/admin/get-subComplaints`, {selectedComplaintID: this.complaintIdChild})
        .subscribe(
          response => {
            console.log(response);
            this.COMPLAINS_DATA = response.data;
            this.dataSource = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, error => {
            console.log(error);
          }
        );
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.complaintIdChild) {
      this.http1.post<any>(`http://localhost:3000/admin/get-subComplaints-details`, {}).subscribe(
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
  }

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public backToAllComplaints(): void {
    this.complaintService.changeProfileModeBooleanSubjectValue(false);
    this.complaintService.changeComplaintIdParentStringSubjectValue(null);
  }

  public redirectToDetails(id: string): void {
    console.log(id);
    this.test = !this.test;
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
  }

}
