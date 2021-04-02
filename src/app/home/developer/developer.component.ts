import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  activeRoute: string;
  constructor() { }

  ngOnInit(): void {
  }
  getRoute(event): void {
    this.activeRoute = event.constructor.name;
    console.log(this.activeRoute);
  }

}
