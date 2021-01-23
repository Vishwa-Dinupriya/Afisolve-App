import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.http.post<any>('http://localhost:3000/home/user-details', {}).subscribe(
      response => this.name = response.firstName,
      error => console.log(error)
    );
  }

}
