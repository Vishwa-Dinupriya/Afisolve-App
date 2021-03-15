import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  foods = [
    {value: 'steak-0', viewValue: 'Steak' , click: this.getAl()},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'hotdog-3', viewValue: 'Hotdog'}
  ];

  // tslint:disable-next-line:typedef
  selectedValue: any;

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  change(event)
  {
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected , event.click);
    }
  }

  // tslint:disable-next-line:typedef
  getAl(){
    this.getAl1();
    this.getAl2();
  }
  // tslint:disable-next-line:typedef
  getAl1() {
    console.log(this.selectedValue);
    // tslint:disable-next-line:triple-equals
    if (this.selectedValue == 'pizza-1'){
      console.log('pizza vitaryi');
    }
  }
  // tslint:disable-next-line:typedef
  getAl2() {
    console.log(this.selectedValue);
    // tslint:disable-next-line:triple-equals no-unused-expression
    if (this.selectedValue == 'tacos-2') {
      console.log('tacos2 vitaryi');
    }
  }
}
