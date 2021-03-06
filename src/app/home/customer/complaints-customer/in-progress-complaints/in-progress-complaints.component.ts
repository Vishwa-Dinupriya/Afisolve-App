import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ComplaintsCustomerService} from '../complaints-customer.service';
import {IComplaintWithSubsElement} from '../../../shared/complaintElementWithSubsInterface/interface-complaint-with-subs.service';
import {AddNewComplaintService} from '../../add-new-complaint/add-new-complaint.service';

@Component({
  selector: 'app-in-progress-complaints',
  templateUrl: './in-progress-complaints.component.html',
  styleUrls: ['./in-progress-complaints.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InProgressComplaintsComponent implements OnInit, AfterViewInit {
  complaintIdToCommentSection;

  complaintStatusID: number | null;

  COMPLAINS_DATA: IComplaintWithSubsElement[];
  dataSource: MatTableDataSource<IComplaintWithSubsElement>;

  columnsToDisplayOuterTable = ['complaintID', 'description', 'submittedDate', 'productID', 'details', 'comment', 'subComplaints'];
  columnsToDisplayInnerTable = ['subComplaintID', 'description', 'submittedDate', 'details'];

  expandedElement: IComplaintWithSubsElement | null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private http1: HttpClient,
    public complaintsCustomerService: ComplaintsCustomerService,
    public addNewComplaintService: AddNewComplaintService) {
  }

  ngOnInit(): void {
    this.addNewComplaintService.changeIsLodgeComplaintModeSubjectBooleanValue(false);
    this.complaintsCustomerService.changeIsCommentSectionModeSubjectBooleanValue(false);
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/customer/get-complaints-by-statusID`, {statusID: this.complaintStatusID = 1}).subscribe(
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

  redirectToCommentSection(complaintID: number): void {
    this.complaintIdToCommentSection = complaintID;
    this.complaintsCustomerService.changeComplaintIdParentSubjectNumberValue(complaintID);
    this.complaintsCustomerService.changeSubComplaintIdParentNumberSubjectValue(0);
    this.complaintsCustomerService.changeIsCommentSectionModeSubjectBooleanValue(true);
  }

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
