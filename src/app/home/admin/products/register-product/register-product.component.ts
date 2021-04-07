import {Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('myForm') myForm;

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
    const dialogRef1 = this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Confirm!!',
        message: 'Do you want to register this as new product? ',
        name: ' ',
        button1: 'Cancel',
        button2: 'Done'
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(this.productRegistrationForm.value);
        this.productService.registerProduct(this.productRegistrationForm.value)
          .subscribe(
            response => {
              const dialogRef2 = this.dialog.open(DialogBoxComponent, {
                data: {
                  title: 'Success!',
                  message: 'Product successfully entered ',
                  name: ' ',
                  button1: 'Back to All products',
                  button2: 'Ok'
                }
              });

              dialogRef2.afterClosed().subscribe(result2 => {
                console.log(`Dialog result: ${result}`);
                this.myForm.resetForm();
                if (result2 === true) {

                } else {
                  this.productService.ChangeCreateProductModeBooleanSubjectValue(false);
                }
              });
            },
            error => console.error('Error!(frontend)', error)
          );
      } else {
        this.productService.ChangeCreateProductModeBooleanSubjectValue(false);
      }
    });
  }
}
