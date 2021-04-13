import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AdminService} from './admin.service';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeRoute: string;

  constructor(
    public homeService: HomeService
  ) {
  }

  ngOnInit(): void {
  }

  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

}
