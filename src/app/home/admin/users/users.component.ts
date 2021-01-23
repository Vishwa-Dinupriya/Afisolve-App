import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['userEmail', 'password', 'firstName', 'lastName', 'contactNumber'];
  dataSource;

  constructor(private router: Router,
              private http1: HttpClient) {

  }

  // links = ['First', 'Second', 'Third'];
  // activeLink = this.links[0];
  // background: ThemePalette = undefined;

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-users-details`, {}).subscribe(
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
