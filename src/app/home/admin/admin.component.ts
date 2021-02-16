import {Component, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeRoute: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

}
