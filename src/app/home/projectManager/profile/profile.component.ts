import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {PastnameService} from '../pastname.service';
import {forbiddenNameValidator2} from '../../../authentication/shared/user-name.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  get massege(): AbstractControl {
    return this.msgForm.get('massege');
  }

  constructor(private router: Router,
              private http1: HttpClient, private pastname: PastnameService, private fb1: FormBuilder, ) {
  }
   dataSourcemsge: any;

  // tslint:disable-next-line:typedef
  msgForm: any;

  ngOnInit(): void {
    this.getdata();
    this.scrollToBottom();
    this.pastname.refreshNeededformsg$
      .subscribe(() => {
        this.getdata();
      });
    this.msgForm = this.fb1.group({
      massege: ['']
    });
  }
  // tslint:disable-next-line:typedef
  getdata(){
    this.http1.get<any>(`http://localhost:3000/projectManager/get-message`, {}).subscribe(
      response => {
        this.dataSourcemsge = response.data;
        console.log(this.dataSourcemsge);
      }, error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  onMsg() {
    console.log(this.msgForm.value);
    this.pastname.newmsg(this.msgForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


}

