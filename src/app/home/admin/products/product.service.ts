import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  registerUrl = 'http://localhost:3000/admin/register-product';

  createProductMode: boolean;
  isProductProfileMode: boolean;
  productID: number;

  createProductModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  isProductProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private productIDSubjectNumber: Subject<number> = new Subject<number>();

  constructor(private http1: HttpClient, private router: Router) {
    this.createProductModeBooleanSubject.subscribe(value => this.createProductMode = value); // next eken enne methnata
    this.isProductProfileModeSubjectBoolean.subscribe(value => this.isProductProfileMode = value);
    this.productIDSubjectNumber.subscribe(value => this.productID = value);
  }

  registerProduct(userData): Observable<any> {
    return this.http1.post<any>(this.registerUrl, userData);
  }

  ChangeCreateProductModeBooleanSubjectValue(newCreateProductModeValue: boolean): void {
    this.createProductModeBooleanSubject.next(newCreateProductModeValue);
  }

  ChangeProductProfileModeBooleanSubjectValue(newValue: boolean): void {
    this.isProductProfileModeSubjectBoolean.next(newValue);
  }

  ChangeProductIDSubjectNumberValue(newValue: number): void {
    this.productIDSubjectNumber.next(newValue);
  }

}
