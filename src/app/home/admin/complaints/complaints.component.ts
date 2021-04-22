import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {ComplaintsService} from './complaints.service';
import {IComplaintWithSubsElement} from '../../shared/complaintElementWithSubsInterface/interface-complaint-with-subs.service';

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

  columnsToDisplayOuterTable = ['complaintID', 'description', 'submittedDate', 'productID', 'details', 'subComplaints'];
  columnsToDisplayInnerTable = ['subComplaintID', 'description', 'submittedDate', 'details'];

  dataSource: MatTableDataSource<IComplaintWithSubsElement>;
  COMPLAINS_DATA: IComplaintWithSubsElement[];

  profileMode = false;

  complaintIdParent: string;

  expandedElement: IComplaintWithSubsElement | null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private http1: HttpClient,
              public dialog: MatDialog,
              public complaintService: ComplaintsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-all-complaints`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        this.dataSource = new MatTableDataSource<IComplaintWithSubsElement>(this.COMPLAINS_DATA);
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

  public redirectToDetails(complaintID: number, subComplaintID: number): void {
    this.complaintService.changeComplaintIdParentNumberSubjectValue(complaintID);
    this.complaintService.changeSubComplaintIdParentNumberSubjectValue(subComplaintID);
    this.complaintService.changeProfileModeBooleanSubjectValue(true);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete ',
        name: id,
        button1: 'Cancel',
        button2: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-complaint`, {selectedUserEmail: id})
          .subscribe(
            response => {
              console.log(response);
              console.log('delete successfully!' + id);
              this.ngAfterViewInit();
            },
            error => {
              console.log(error);
              console.log('error! delete not success! ' + id);
              this.ngAfterViewInit();
            });
      } else {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

}
