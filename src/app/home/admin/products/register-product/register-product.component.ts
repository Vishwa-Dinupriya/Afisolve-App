import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {HttpClient} from '@angular/common/http';
import {DialogBoxComponent} from '../../../shared/dialog-box/dialog-box.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  productRegistrationForm: FormGroup;

  constructor(private fb1: FormBuilder,
              private productService: ProductService,
              private http1: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.productRegistrationForm = this.fb1.group({
      productName: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      customerEmail: ['testCustomer1@gmail.com', [Validators.required]],
      projectManagerEmail: ['test1@gmail.com', [Validators.required]],
      accountCoordinatorEmail: ['test1@gmail.com', [Validators.required]],
    });
  }


  onSubmit(): void {
    console.log(this.productRegistrationForm.value);
    this.productService.registerProduct(this.productRegistrationForm.value)
      .subscribe(
        response => {
          const dialogRef = this.dialog.open(DialogBoxComponent, {
            data: {
              title: 'Success!',
              message: 'Product successfully entered ',
              name: ' ',
              button1: 'Back to All products',
              button2: 'Ok'
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result === true) {
              this.ngOnInit();
            } else {
              this.ngOnInit();
              this.productService.ChangeCreateProductModeBooleanSubjectValue(false);
            }
          });
        },
        error => console.error('Error!(frontend)', error)
      );
  }
}
