import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url1 = 'http://localhost:3000/enroll';

  constructor(private http1: HttpClient) {
  }

  register(userData) {
    return this.http1.post<any>(this.url1, userData);
  }

}
