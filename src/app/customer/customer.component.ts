import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  result;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  sendRequest(): void {
    this.http.post<any>('http://localhost:3000/api/test', {}).subscribe(
      response => {
        this.result = response;
      },
      error => console.log(error)
  );
  }

}
