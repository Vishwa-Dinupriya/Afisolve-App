import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

// export interface PeriodicElement {
//   description: string;
//   status: number;
//   submittedDate: number;
// }

@Component({
  selector: 'app-complaint',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  displayedColumns: string[] = ['description', 'status', 'submittedDate', 'test'];
  dataSource;

  constructor(private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-complaints-details`, {}).subscribe(
      response => {
        this.dataSource = response.data;
        console.log(this.dataSource);
      }, error => {
        console.log(error);
      }
    );
  }
}
