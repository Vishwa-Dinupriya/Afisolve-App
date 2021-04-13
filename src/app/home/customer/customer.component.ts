import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {HomeService} from '../home.service';
import {ComplaintsCustomerService} from './complaints-customer/complaints-customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  activeRoute: string;
  collapseComplaints;

  constructor(
    public homeService: HomeService,
    private complaintsCustomerService: ComplaintsCustomerService
  ) {
  }

  ngOnInit(): void {
    this.collapseComplaints = true;
  }

  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

  resetComplaintProfileMode(): void {
    this.complaintsCustomerService.changeIsComplaintProfileModeSubjectBooleanValue(false);
  }
}
