import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {ComplaintsService} from './complaints.service';
import {IComplaintWithSubsElement} from '../../shared/complaintElementWithSubsInterface/interface-complaint-with-subs.service';

export interface ITabComplaints {
  statusID: number;
  statusName: string;
  dataSource?: MatTableDataSource<IComplaintWithSubsElement>;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComplaintsComponent implements OnInit, AfterViewInit {

  columnsToDisplayOuterTable = ['complaintID', 'description', 'submittedDate', 'productID', 'details', 'delete', 'subComplaints'];
  columnsToDisplayInnerTable = ['subComplaintID', 'description', 'submittedDate', 'details'];

  dataSource: MatTableDataSource<IComplaintWithSubsElement>;
  COMPLAINS_DATA: IComplaintWithSubsElement[];

  complaintsTabs: ITabComplaints[] = [
    {statusID: 4, statusName: 'All'},
    {statusID: 0, statusName: 'Pending'},
    {statusID: 1, statusName: 'In-Progress'},
    {statusID: 2, statusName: 'Completed'},
    {statusID: 3, statusName: 'Closed'}];

  profileMode = false;

  complaintIdParent: string;

  expandedElement: IComplaintWithSubsElement | null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http1: HttpClient,
              public dialog: MatDialog,
              public complaintService: ComplaintsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => console.log(params));
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-complaints`, {}).subscribe(
      response => {
        // console.log(response.data);
        this.COMPLAINS_DATA = response.data;
        this.complaintsTabs.forEach(tab => {
          tab.dataSource = new MatTableDataSource<IComplaintWithSubsElement>(this.COMPLAINS_DATA.filter(
            complaint => tab.statusID === 4 ? true : complaint.status === tab.statusID));
          tab.dataSource.sort = this.sort;
          tab.dataSource.paginator = this.paginator;
        });
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

  public redirectToDetails(complaintID: number, subComplaintID: number): void {
    this.complaintService.changeComplaintIdParentNumberSubjectValue(complaintID);
    this.complaintService.changeSubComplaintIdParentNumberSubjectValue(subComplaintID);
    this.complaintService.changeProfileModeBooleanSubjectValue(true);
  }


  public redirectToDelete(complaintID: number, subComplaintID: number): void {
    console.log(complaintID);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete this complaint with ',
        name: 'complaint ID:' + complaintID ,
        button1: 'Cancel',
        button2: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-complaint`, {complaintID})
          .subscribe(
            response => {
              // console.log(response);
              // console.log('delete successfully!' + complaintID + '-' + subComplaintID);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'Complaint successfully Deleted! ',
                  name: ' ',
                  button1: '',
                  button2: 'Ok'
                }
              });
              dialogRef2.afterClosed().subscribe(result2 => {
                // console.log(`Dialog result: ${result}`);
                if (result2 === true) {
                  this.ngAfterViewInit();
                } else {

                }
              });
              this.ngAfterViewInit();
            },
            error => {
              // console.log(error);
              // console.log('error! delete not success! ' + complaintID + '-' + subComplaintID);
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Failed!',
                  message: 'Something went wrong! ',
                  name: ' ',
                  button1: '',
                  button2: 'Retry'
                }
              });
              dialogRef2.afterClosed().subscribe(result2 => {
                // console.log(`Dialog result: ${result}`);
                if (result2 === true) {
                  this.ngAfterViewInit();

                } else {

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
