import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'category', 'customerEmail', 'projectManagerEmail', 'accountCoordinatorEmail'];
  dataSource;

  constructor(private router: Router,
              private http1: HttpClient) {
  }

  ngOnInit(): void {
    this.http1.post<any>(`http://localhost:3000/admin/get-products-details`, {}).subscribe(
      response => {
        this.dataSource = response.data;
        console.log(this.dataSource);
      }, error => {
        console.log(error);
      }
    );

    this.router.navigate(['/home/admin/products/register-product']);
  }

}
