import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  productRegistrationForm: FormGroup;

  constructor(private fb1: FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productRegistrationForm = this.fb1.group({
      productName: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      customerEmail: ['customer@gmail.com', [Validators.required]],
      projectManagerEmail: ['projectManger@gmail.com', [Validators.required]],
      accountCoordinatorEmail: ['account_c@gmail.com', [Validators.required]],
    });
  }


  onSubmit(): void {
    console.log(this.productRegistrationForm.value);
    this.productService.registerProduct(this.productRegistrationForm.value)
      .subscribe(
        response => {
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }
}
