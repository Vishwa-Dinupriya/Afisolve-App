import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-late-complaint-information',
  templateUrl: './late-complaint-information.component.html',
  styleUrls: ['./late-complaint-information.component.css']
})
export class LateComplaintInformationComponent implements OnInit {

  displayedColumns: string[] = ['complainID', 'description', 'submittedDate', 'lastDateOfPending' , 'Action'];
  dataSource;
  routerLink: any;

  constructor(private router: Router, private route: ActivatedRoute, private http1: HttpClient) { }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/projectManager/get-complaint-details`, {}).subscribe(
      response => {
        this.dataSource = response.data;
        console.log(this.dataSource);
      }, error => {
        console.log(error);
      }
    );
  }

  getAction() {
    this.router.navigate(['/home/project-manager/late-complaint-information/action']);
  }
}
