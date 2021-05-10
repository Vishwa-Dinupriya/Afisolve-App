import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CommentSectionService} from './comment-section.service';
import {DialogBoxSelectPictureComponent} from '../../../shared/dialog-box-select-picture/dialog-box-select-picture.component';
import {MatDialog} from '@angular/material/dialog';
import {ComplaintsCustomerService} from '../../customer/complaints-customer/complaints-customer.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/observable/timer';
import {AccoorcomplaintsService} from '../../accountCoordinator/accoorcomplaints/accoorcomplaints.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, AfterViewChecked, OnChanges, OnDestroy {

  @Input() complaintIdInput: number;
  @Input() senderRole: string;
  currentUserID;
  textComment: string = null;

  public showLoader = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(private router: Router,
              private http1: HttpClient,
              private commentSectionService: CommentSectionService,
              public dialog: MatDialog,
              public complaintCustomerService: ComplaintsCustomerService,
              public accoorcomplaintService: AccoorcomplaintsService) {
  }

  @ViewChild('scrollBottom') private scrollBottom: ElementRef;

  // dataSourceComments: any;
  dataSourceComments = [];

  imageAttachments = [];
  chatBoxHeight: number;

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  ngOnChanges(): void {
    if (this.complaintIdInput) {
      this.currentUserID = localStorage.getItem('userID');
      this.getComments(this.complaintIdInput);
      this.setTimer();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    // this.currentUserID = localStorage.getItem('userID');
    this.chatBoxHeight = 100;
    this.scrollToBottom();
    this.setTimer();
    this.commentSectionService.refreshNeededForMsgSubject.subscribe(() => {
      this.ngOnChanges();
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  getComments(reqComplaintID: number): void {
    const complaintID = new HttpParams().set('complaintID', String(Number(reqComplaintID))); // Create new HttpParams
    this.http1.get<any>(`http://localhost:3000/` + this.senderRole + `/get-comments`, {params: complaintID}).subscribe(
      response => {
        this.dataSourceComments = response.data;
        // console.log(this.dataSourceComments);
        // console.log('this.currentUserID: ' + this.currentUserID);
      }, error => {
        console.log(error);
      }
    );
  }

  public setTimer(): void {
    // set showLoader to true to show loading div on view
    this.showLoader = true;

    this.timer = Observable.timer(1000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      // set showLoader to false to hide loading div from view after 5 seconds
      this.showLoader = false;
    });
  }

  clickSend(text: string): void {
    this.commentSectionService.sendComment(text, this.imageAttachments, this.complaintIdInput, this.senderRole).subscribe(
      response => {
        this.textComment = '';
        if (this.imageAttachments.length > 0) { // clear image attachment array
          this.imageAttachments = []; // reset the array
        }
        this.chatBoxHeight = 100;
        // console.log('Success!(frontend)', response);
      },
      error => console.error('Error!(frontend)', error)
    );
  }

  openDialog(n: number): void {
    let img;
    if (n === -1) {
      img = '../../../../assets/img/add-image-icon.jpg';
    } else {
      img = this.imageAttachments[n];
    }
    const dialogRef = this.dialog.open(DialogBoxSelectPictureComponent, {
      data: {
        currentPicture: img
      }
    });

    dialogRef.afterClosed().subscribe(picture => {
      if (picture !== '' && picture !== undefined) {
        if (n !== -1) {
          this.imageAttachments[n] = picture;
        } else {
          this.imageAttachments.push(picture);
        }
        console.log(this.imageAttachments);
        // change chat-box height
        if (this.imageAttachments.length === 0) {
          this.chatBoxHeight = 100;
        } else {
          this.chatBoxHeight = 60;
        }
      }
    });

  }

  removeSelectedImage(index: number): void {
    this.imageAttachments[index] = null;
    for (let i = index; i < this.imageAttachments.length - 1; i++) {
      this.imageAttachments[i] = this.imageAttachments[i + 1];
    }
    this.imageAttachments.pop();
    // change chat-box height
    if (this.imageAttachments.length > 0) {
      this.chatBoxHeight = 60;
    } else {
      this.chatBoxHeight = 100;
    }
  }

  whenClose(): void {
    this.imageAttachments = [];
    this.complaintCustomerService.changeIsCommentSectionModeSubjectBooleanValue(false);
    this.accoorcomplaintService.changeIsCommentSectionModeSubjectBooleanValue(false);
    this.ngOnDestroy(); // to unsubscribe timer
  }
}
