import { Component, OnInit, Input } from '@angular/core';
import {AccoorcomplaintsService} from '../accoorcomplaints.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-accoorcomplaint-profile',
  templateUrl: './accoorcomplaint-profile.component.html',
  styleUrls: ['./accoorcomplaint-profile.component.css']
})
export class AccoorcomplaintProfileComponent implements OnInit {

  @Input() complaintIDChild: number;
  complaintIdAvailable;
  tabIndex = 1;

  constructor(private http1: HttpClient,
              public accoorcomplaintService: AccoorcomplaintsService) { }

  ngOnInit(): void {
    if (!this.complaintIDChild) {
      this.complaintIdAvailable = false;
    }
  }
  public backToAllComplaints(): void {
    this.accoorcomplaintService.ChangeComplaintProfileModeBooleanSubjectValue(false);
    this.accoorcomplaintService.ChangeComplaintIDSubjectNumberValue(null);
  }

}
