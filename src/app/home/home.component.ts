import { Component } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { ImageProcessingService } from '../_service/image-processing.service';
import { Router } from '@angular/router';
import { Product } from '../_model/product';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  pageNumber: number = 0;

  productDetails :Product[]= [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // searchByKeyword(searchkeyword) {
  //   console.log(searchkeyword);
  //   this.pageNumber = 0;
  //   this.productDetails = [];
  //   this.getAllProducts(searchkeyword);
  // }

  public getAllProducts() {
    this.productService.getAllProduct()
    .pipe(
      map((products:Product[])=>products.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log("Home Component")
        console.log(resp);
        // if(resp.length == 12) {
        //   this.showLoadButton = true;
        // } else {
        //   this.showLoadButton = false;
        // }
        resp.forEach( (p:Product) => this.productDetails.push(p));
       
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // public loadMoreProduct() {
  //   this.pageNumber = this.pageNumber + 1;
  //   this.getAllProducts();
  // }

  productViewDetails(productId:any) {
    this.router.navigate(['/productView', {productId: productId}]);
  }
}