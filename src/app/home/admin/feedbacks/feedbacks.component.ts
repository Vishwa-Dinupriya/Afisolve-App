import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FeedbacksService} from './feedbacks.service';

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
              public feedbacksService: FeedbacksService) {

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

  applyFilter(event): void {
    // console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails(complaintID: number): void {
    console.log(complaintID);
    this.feedbacksService.changeComplaintIdParentNumberSubjectValue(complaintID);
    this.feedbacksService.changeProfileModeBooleanSubjectValue(true);
  }

  public redirectToUpdate(id: string): void {
    console.log(id);
  }

  public redirectToDelete(id: string): void {
    console.log(id);
  }

}


