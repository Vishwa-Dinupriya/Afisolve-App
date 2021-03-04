import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-account-coordinator',
  templateUrl: './account-coordinator.component.html',
  styleUrls: ['./account-coordinator.component.css']
})
export class AccountCoordinatorComponent implements OnInit {

  activeRoute: string;
  constructor() { }

  ngOnInit(): void {
  }
  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

}
