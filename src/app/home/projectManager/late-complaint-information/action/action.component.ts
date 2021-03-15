import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {PastnameService} from '../../../services/pastname.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
// tslint:disable-next-line:class-name

export class ActionComponent implements OnInit {
  accdata;
  selectedValue: any;
  message: any;
  constructor(private http1: HttpClient, private pastname: PastnameService, private fb1: FormBuilder,) {
  }

  ngOnInit(): void {
    this.getData1();
  }

  // account coordinatorlage names
  getData1(): void {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-account-coordinaters-details`, {}).subscribe(
      response => {
        this.accdata = response.data;
        console.log(this.accdata);
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef



  // tslint:disable-next-line:typedef
  giveAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.givenewName();
        Swal.fire(
          'change saved!',
          '',
          'success'
        );
      }
    });
  }

  // tslint:disable-next-line:typedef
  givenewName() {
    console.log(this.selectedValue);
    this.pastname.newacname(this.selectedValue)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }

}

