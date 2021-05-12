import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {HomeService} from '../home.service';
import {ComplaintsCustomerService} from './complaints-customer/complaints-customer.service';
import {AddNewComplaintService} from './add-new-complaint/add-new-complaint.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  activeRoute: string;
  collapseComplaints;

  childRoute: string;

  constructor(
    public homeService: HomeService,
    private router: Router,
    private complaintsCustomerService: ComplaintsCustomerService,
    public addNewComplaintService: AddNewComplaintService
  ) {
  }

  ngOnInit(): void {
    this.collapseComplaints = true;


    this.childRoute = this.router.url.split(/\//)[4];
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.childRoute = value.urlAfterRedirects.split(/\//)[4];
      }
    });

  }

  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    // console.log(this.activeRoute);
  }

  resetComplaintProfileMode(): void {
    this.complaintsCustomerService.changeIsComplaintProfileModeSubjectBooleanValue(false);
  }

}
