import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  sendRequest(): void {
    this.http.post<any>('http://localhost:3000/admin/test', {}).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
