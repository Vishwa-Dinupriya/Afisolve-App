import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserDataService} from './services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    public userDetails: UserDataService
  ) {
  }

  ngOnInit(): void {
    this.userDetails.getUserDetails().subscribe(
      response => {
        this.userDetails.changeName(response.firstname);
        console.log(this.userDetails.name);
      },
      error => {
        console.log(error);
      }
    );
  }

}
