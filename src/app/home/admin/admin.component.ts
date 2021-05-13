import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AdminService} from './admin.service';
import {HomeService} from '../home.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeRoute: string;
  childRoute: string;
  constructor(
    public homeService: HomeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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

}
