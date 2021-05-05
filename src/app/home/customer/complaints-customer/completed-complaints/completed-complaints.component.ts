import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ComplaintsCustomerService} from '../complaints-customer.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewDialogBoxComponent} from './review-dialog-box/review-dialog-box.component';
import {CompletedComplaintService} from './completed-complaint.service';
import {DialogBoxComponent} from '../../../../shared/dialog-box/dialog-box.component';
import {IComplaintWithSubsElement} from '../../../shared/complaintElementWithSubsInterface/interface-complaint-with-subs.service';
import {AddNewComplaintComponent} from '../../add-new-complaint/add-new-complaint.component';
import {AddNewComplaintService} from '../../add-new-complaint/add-new-complaint.service';

@Component({
  selector: 'app-completed-complaints',
  templateUrl: './completed-complaints.component.html',
  styleUrls: ['./completed-complaints.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompletedComplaintsComponent implements OnInit, AfterViewInit {

  complaintStatusID: number | null;
  COMPLAINS_DATA: IComplaintWithSubsElement[];
  dataSource: MatTableDataSource<IComplaintWithSubsElement>;

  columnsToDisplayOuterTable = ['complaintID', 'description', 'submittedDate', 'productID', 'details', 'review', 'subComplaints'];
  columnsToDisplayInnerTable = ['subComplaintID', 'description', 'submittedDate', 'details'];

  expandedElement: IComplaintWithSubsElement | null;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private http1: HttpClient,
    public addNewComplaintService: AddNewComplaintService,
    public complaintsCustomerService: ComplaintsCustomerService,
    public dialog: MatDialog,
    public completedComplaintService: CompletedComplaintService) {
  }

  ngOnInit(): void {
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(false);
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/customer/get-complaints-by-statusID`, {statusID: this.complaintStatusID = 2}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        // this.dataSource = this.COMPLAINS_DATA;
        this.dataSource = new MatTableDataSource<IComplaintWithSubsElement>(this.COMPLAINS_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  redirectToDetails(complaintID: number, subComplaintID: number): void {
    this.complaintsCustomerService.changeComplaintIdParentSubjectNumberValue(complaintID);
    this.complaintsCustomerService.changeSubComplaintIdParentNumberSubjectValue(subComplaintID);
    this.complaintsCustomerService.changeIsComplaintProfileModeSubjectBooleanValue(true);
  }

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public requestFeedbackDialog(complaintID): void {
    const dialogRef = this.dialog.open(ReviewDialogBoxComponent, {
      data: {
        title: 'Rate us',
        step: 1,
        button1: 'No, I\'m not satisfied',
        button2: 'Done'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.confirmFeedBackDialog(complaintID);
      } else if (result === false) {
        console.log(`Dialog result: ${result}`);
        this.createSubComplaintDialog(complaintID);
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  public confirmFeedBackDialog(complaintID): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'This will close the complaint forever and never can re-open',
        name: '',
        button1: 'Cancel',
        button2: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Confirm Dialog result: ${result}`);
      if (result === true) {
        this.http1.post<any>(`http://localhost:3000/customer/create-feedback`,
          {
            complaintID_: complaintID,
            ratedValue: this.completedComplaintService.ratedValue,
            feedback: this.completedComplaintService.feedback
          }).subscribe(
          response => {
            console.log(response);
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.requestFeedbackDialog(complaintID);
      }
    });
  }

  public createSubComplaintDialog(complaintID): void {
    const dialogRef = this.dialog.open(ReviewDialogBoxComponent, {
      data: {
        title: 'Why..? ',
        step: 2,
        button1: 'Cancel',
        button2: 'Done'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.http1.post<any>(`http://localhost:3000/customer/lodge-sub-complaint`,
          {
            complaintID_: complaintID,
            subComplaint: this.completedComplaintService.subComplaintDescription,
          }).subscribe(
          response => {
            console.log(response);
          }, error => {
            console.log(error);
          }
        );
      } else {
        console.log(`Dialog result: ${result}`);
        this.requestFeedbackDialog(complaintID);
      }
    });
  }

}
