import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  displayedColumns: string[] = ['userEmail', 'password', 'firstName', 'lastName', 'contactNumber'];
  dataSource;

  constructor(private router: Router,
              private http1: HttpClient) {

  }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-feedbacks-details`, {}).subscribe(
      response => {
        this.dataSource = response.data;
        console.log(this.dataSource);
      }, error => {
        console.log(error);
      }
    );
    this.router.navigate(['/home/admin/users/signup']);
  }
}
