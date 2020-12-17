import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  name: string;

  constructor(private http: HttpClient, public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/admin/user-details', {}).subscribe(
      response => this.name = response.email,
      error => console.log(error)
    );
  }

}
