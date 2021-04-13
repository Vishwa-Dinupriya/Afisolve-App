import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionService {

  private refreshNeededForMsgSubject$ = new Subject<void>();

  constructor(private http1: HttpClient, private router: Router) {
  }

  get refreshNeededForMsgSubject(): Subject<void> {
    return this.refreshNeededForMsgSubject$;
  }

  // send comment to the API.........................
  sendComment(text: string, images: any, complaintID: number, senderRole: string): Observable<any> {
    const sendCommentUrl = 'http://localhost:3000/' + senderRole + '/save-comment_';
    console.log(sendCommentUrl);
    return this.http1.put<any>(sendCommentUrl, {text, images, complaintID})
      .pipe(
        tap(() => {
            this.refreshNeededForMsgSubject$.next();
          }
        )
      );
  }
}

