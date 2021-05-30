import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProductService} from '../../admin/products/product.service';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';

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
  dev: any;
}

export interface IComplaintProduct {
  complaintID: string;
  submittedDate: string;
}

export interface IDeveloperProduct {
  firstName: string;
  lastName: string;
  userEmail: string;
}

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit, OnChanges {
  @Input() productIDChild: number;

  PRODUCT_DETAILS_DATA: IProductDetailsAdmin; // undefined
  COMPLAINTS_PRODUCT_DATA: IComplaintProduct[] = []; // defined
  DEVELOPERS_PRODUCT_DATA: IDeveloperProduct[] = [];

  productIdAvailable;
  tabIndex = 1;
  isHiddenAc: boolean;
  accData: any;
  selectedAccountCoordinator: any;
  selectedNewProjectManager: any;
  a: number;
  isHiddenPm: boolean;
  pmData: any;

  selected = [];
  newSelected: any;
  toppings: FormControl;
  ddData: any;
  isHiddenDD: boolean;
  isOpen = false;

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
            // console.log(response);
            this.tabIndex = 0;
            this.PRODUCT_DETAILS_DATA = response.data; // undifined -> defined weno
            this.COMPLAINTS_PRODUCT_DATA = response.data.complaintsDetails; // defined -> undifined
            this.DEVELOPERS_PRODUCT_DATA = response.data.developersDetails;

            this.selected = [];
            for (let i = 0; i < response.data.dev.length; i++) {
              this.selected[i] = response.data.dev[i].devID;
            }
            this.toppings = new FormControl(this.selected);
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
    this.isHiddenDD = false;
    this.productService.refreshNeededForAcName$
      .subscribe(() => {
        this.ngOnChanges();
      });
  }

  public backToAllProducts(): void {
    this.productService.ChangeProductProfileModeBooleanSubjectValue(false);
    this.productService.ChangeProductIDSubjectNumberValue(null);
  }

  editAc(): void {
    this.isHiddenAc = true;
    this.http1.get<any>(`http://localhost:3000/ceo/get-account-coordinaters-details`, {}).subscribe(
      response => {
        this.accData = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

  submitNewAc(): void {
    this.isHiddenAc = false;
    console.log(this.selectedAccountCoordinator);
    console.log(this.PRODUCT_DETAILS_DATA.productID);
    this.productService
      .newAc(this.PRODUCT_DETAILS_DATA.productID, this.selectedAccountCoordinator)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.log('Error!(frontend)', error)
      );
  }

  editPm(): void {
    this.isHiddenPm = true;
    this.http1.post<any>(`http://localhost:3000/admin/get-project-Manager-List`, {}).subscribe(
      response => {
        this.pmData = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

  submitNewPm(): void {
    this.isHiddenPm = false;
    console.log(this.selectedNewProjectManager);
    console.log(this.PRODUCT_DETAILS_DATA.productID);
    this.productService
      .newPm(this.PRODUCT_DETAILS_DATA.productID, this.selectedNewProjectManager)
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
    this.isHiddenDD = false;
  }

  editDev(): void {
    this.isHiddenDD = true;
    this.http1.post<any>(`http://localhost:3000/admin/get-developer-List`, {}).subscribe(
      response => {
        this.ddData = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

  submitNewDev(): void {
    this.isHiddenDD = false;
    console.log(this.newSelected);
    this.productService.newDev(this.newSelected, this.PRODUCT_DETAILS_DATA.productID)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.log('Error!(frontend)', error)
      );
  }

}
