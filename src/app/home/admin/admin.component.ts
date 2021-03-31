import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeRoute: string;

  constructor(
    public toggleService: AdminService
  ) {
  }

  ngOnInit(): void {
  }

  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

}
