import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {
  displayedAllo: string[] = ['productID', 'DevName', 'developerEmail'];
  dataSourceAllo;


  constructor(private router: Router,
              private http1: HttpClient) { }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/accountCoordinator/get-allocation-details`, {}).subscribe(
      response => {
        this.dataSourceAllo = response.data;
        console.log(this.dataSourceAllo);
      }, error => {
        console.log(error);
      }
    );
  }

}
