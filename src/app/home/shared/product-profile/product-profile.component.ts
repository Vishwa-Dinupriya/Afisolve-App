import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProductService} from '../../admin/products/product.service';
import {HttpClient} from '@angular/common/http';

export interface IProductDetailsAdmin {
  accountCoordinatorEmail: string;
  accountCoordinatorFirstName: string;
  accountCoordinatorLastName: string;
  category: string;
  createdAt: string;
  createdBy: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  modifiedAt: string;
  modifiedBy: string;
  productID: number;
  productName: string;
  projectManagerEmail: string;
  projectManagerFirstName: string;
  projectManagerLastName: string;
}

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit, OnChanges {
  @Input() productIDChild: number;
  PRODUCT_DETAILS_DATA: IProductDetailsAdmin;
  productIdAvailable;
  tabIndex = 1;
  isHiddenAc: boolean;
  accData: any;
  selectedValue: any;
  selectedValue1: any;
  a: number;
  isHiddenPm: boolean;
  pmData: any;

  constructor(private http1: HttpClient,
              public productService: ProductService) {
  }

  ngOnChanges(): void {
    if (this.productIDChild) {
      this.productIdAvailable = true;
      this.http1.post<any>(`http://localhost:3000/admin/get-selected-product-details`, {
        productID: this.productIDChild,
      })
        .subscribe(
          response => {
            console.log(response);
            this.tabIndex = 0;
            this.PRODUCT_DETAILS_DATA = response.data;
            console.log(this.PRODUCT_DETAILS_DATA);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.productIdAvailable = false;
    }
  }

  ngOnInit(): void {
    if (!this.productIDChild) {
      this.productIdAvailable = false;
    }
    this.isHiddenAc = false;
    this.isHiddenPm = false;
    this.productService.refreshNeededForAcName$
      .subscribe(() => {
        this.ngOnChanges();
      });
  }

  public backToAllProducts(): void {
    this.productService.ChangeProductProfileModeBooleanSubjectValue(false);
    this.productService.ChangeProductIDSubjectNumberValue(null);
  }

  editAc(): void{
    this.isHiddenAc = true;
    this.http1.get<any>(`http://localhost:3000/ceo/get-account-coordinaters-details`, {}).subscribe(
      response => {
        this.accData = response.data;
        console.log(this.accData);
      }, error => {
        console.log(error);
      }
    );
  }

  submitNewAc(): void {
    this.isHiddenAc = false;
    console.log(this.selectedValue);
    console.log(this.PRODUCT_DETAILS_DATA.productID);
    this.productService.newAc(this.PRODUCT_DETAILS_DATA.productID, this.selectedValue, this.PRODUCT_DETAILS_DATA.accountCoordinatorEmail)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.log('Error!(frontend)', error)
      );
  }

  editPm(): void{
    this.isHiddenPm = true;
    this.http1.post<any>(`http://localhost:3000/admin/get-project-Manager-List`, {}).subscribe(
      response => {
        this.pmData = response.data;
        console.log(this.accData);
      }, error => {
        console.log(error);
      }
    );
  }

  submitNewPm(test, selectedValue, maill): void {
    this.isHiddenPm = false;
    console.log(this.selectedValue1);
    console.log(this.PRODUCT_DETAILS_DATA.productID);
    this.productService.newPm(this.PRODUCT_DETAILS_DATA.productID, this.selectedValue1, this.PRODUCT_DETAILS_DATA.projectManagerEmail)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.log('Error!(frontend)', error)
      );
  }

  cancel(): void {
    this.isHiddenAc = false;
    this.isHiddenPm = false;
  }
}
