import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {environment} from '../../../../environments/environment';
import {DevtaskService} from '../devtasks/devtask.service';


export interface IAllComp {
  complaintID: number;
  subComplaintID: number;
  productID: string;
  productName: string;
  description: string;
  statusName: string;
}


@Component({
  selector: 'app-devcomplaints',
  templateUrl: './devcomplaints.component.html',
  styleUrls: ['./devcomplaints.component.css']
})
export class DevcomplaintsComponent implements OnInit,  AfterViewInit {
  displayedComp: string[] = ['complaintID', 'subComplaintID', 'productID', 'productName', 'submittedDate',  'statusName', 'details'];
  dataSource1: MatTableDataSource<IAllComp>;
  ALLCOMPLAINTS_DATA: IAllComp[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public devtaskService: DevtaskService) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.http1.post<any>(environment.developerApiUrl + `/get-devComplaints-details`, {}).subscribe(
      response => {
        this.ALLCOMPLAINTS_DATA = response.data;
        this.dataSource1 = new MatTableDataSource<IAllComp>(this.ALLCOMPLAINTS_DATA);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }
  applyFilterAll(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  public redirectToDetails(complaintID: number, subComplaintID: number): void {
    this.devtaskService.changeComplaintIdParentNumberSubjectValue(complaintID);
    this.devtaskService.changeSubComplaintIdParentNumberSubjectValue(subComplaintID);
    this.devtaskService.changeProfileModeBooleanSubjectValue(true);
  }

}
