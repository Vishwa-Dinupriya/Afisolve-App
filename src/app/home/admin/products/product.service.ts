import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  registerUrl = 'http://localhost:3000/admin/register-product';
  newAcUrl = 'http://localhost:3000/admin/update-Ac';
  newDevUrl = 'http://localhost:3000/admin/update-Dev';
  newPmUrl = 'http://localhost:3000/admin/update-Pm';

  createProductMode: boolean;
  isProductProfileMode: boolean;
  productID: number;

  public subject = new Subject<any>();
  createProductModeBooleanSubject: Subject<boolean> = new Subject<boolean>();
  isProductProfileModeSubjectBoolean: Subject<boolean> = new Subject<boolean>();
  private productIDSubjectNumber: Subject<number> = new Subject<number>();
  // tslint:disable-next-line:variable-name
  private _refreshNeededForAcName$ = new Subject<void>();



  constructor(private http1: HttpClient, private router: Router) {
    this.createProductModeBooleanSubject.subscribe(value => this.createProductMode = value); // next eken enne methnata
    this.isProductProfileModeSubjectBoolean.subscribe(value => this.isProductProfileMode = value);
    this.productIDSubjectNumber.subscribe(value => this.productID = value);
  }

  // tslint:disable-next-line:typedef
  get refreshNeededForAcName$() {
    return this._refreshNeededForAcName$;
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

  // tslint:disable-next-line:typedef
  newAc(test, selectedValue, maill): Observable<any>  {
    return this.http1
      .post<any>(this.newAcUrl, {v: test, u: selectedValue, w: maill})
      .pipe(
         tap(() => {
            this._refreshNeededForAcName$.next();
          }
        )
      );
  }

  newPm(test, selectedValue, maill): Observable<any>  {
    return this.http1
      .post<any>(this.newPmUrl, {v: test, u: selectedValue, w: maill})
      .pipe(
        tap(() => {
            this._refreshNeededForAcName$.next();
          }
        )
      );
  }

  newDev(test, selectedValue): Observable<any>  {
    return this.http1
      .post<any>(this.newDevUrl, {c: test, d: selectedValue})
      .pipe(
        tap(() => {
            this._refreshNeededForAcName$.next();
          }
        )
      );
  }
}
