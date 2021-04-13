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
  }

  public backToAllProducts(): void {
    this.productService.ChangeProductProfileModeBooleanSubjectValue(false);
    this.productService.ChangeProductIDSubjectNumberValue(null);
  }

}
