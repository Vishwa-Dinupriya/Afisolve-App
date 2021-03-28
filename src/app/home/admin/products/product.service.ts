import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  registerUrl = 'http://localhost:3000/admin/register-product';

  constructor(private http1: HttpClient, private router: Router) {
  }

  registerProduct(userData): Observable<any> {
    return this.http1.post<any>(this.registerUrl, userData);
  }
}
