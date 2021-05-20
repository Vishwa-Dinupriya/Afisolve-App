import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FeedbacksService} from './feedbacks.service';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';

export interface IFeedback {
  complaintID: string;
  description: string;
  satisfaction: number;
}

export interface ITabFeedbacks {
  ratedValue: number;
  dataSource?: MatTableDataSource<IFeedback>;
}

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['complaintID', 'satisfaction', 'description', 'details', 'delete'];
  dataSource: MatTableDataSource<IFeedback>;
  FEEDBACKS_DATA: IFeedback[];

  feedbacksTabs: ITabFeedbacks[] = [
    {ratedValue: 6},
    {ratedValue: 0},
    {ratedValue: 1},
    {ratedValue: 2},
    {ratedValue: 3},
    {ratedValue: 4},
    {ratedValue: 5}];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  starCount = 5;
  ratingArr = [];

  constructor(private router: Router,
              private http1: HttpClient,
              public feedbacksService: FeedbacksService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  ngAfterViewInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-feedbacks-details`, {}).subscribe(
      response => {
        this.FEEDBACKS_DATA = response.data;
        this.feedbacksTabs.forEach(tab => {
          tab.dataSource = new MatTableDataSource<IFeedback>(this.FEEDBACKS_DATA.filter(
            feedback => tab.ratedValue === 6 ? true : feedback.satisfaction === tab.ratedValue));
          tab.dataSource.sort = this.sort;
          tab.dataSource.paginator = this.paginator;
        });

      }, error => {
        console.log(error);
      }
    );
  }

  showIcon(index: number, ratedValue: number): 'star' | 'star_border' {
    if (ratedValue >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  applyFilter(event, tabIndex): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.feedbacksTabs[tabIndex].dataSource.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails(complaintID: number): void {
    console.log(complaintID);
    this.feedbacksService.changeComplaintIdParentNumberSubjectValue(complaintID);
    this.feedbacksService.changeProfileModeBooleanSubjectValue(true);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(complaintID: string): void {
    console.log(complaintID);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Are you sure?',
        message: 'Are you want to delete this feedback with ',
        name: 'Complaint ID:' + complaintID ,
        button1: 'Cancel',
        button2: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${result}`);
        this.http1.post<any>(`http://localhost:3000/admin/delete-selected-feedback`, {complaintID})
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'Feedback successfully Deleted! ',
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


