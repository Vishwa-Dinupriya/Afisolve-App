import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

  productRegistrationForm: FormGroup;

  constructor(private fb1: FormBuilder,
              private productService: ProductService,
              private http1: HttpClient) {
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
          console.log('Success!(frontend)', response);
        },
        error => console.error('Error!(frontend)', error)
      );
  }
}
