import { Component, Input,EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../_service/product.service'; 
import { ImageProcessingService } from '../../_service/image-processing.service'; 
import { Router } from '@angular/router';
import { Product } from '../../_model/product';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-interested-product',
  templateUrl: './interested-product.component.html',
  styleUrl: './interested-product.component.css'
})
export class InterestedProductComponent {

  @Input()
  ignoreProductId:any=0;


  productDetails :Product[]= [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  percentage(discountedPrice:number,actualPrice:number){
    const disAmount:number=actualPrice-discountedPrice;
    return Math.round((disAmount/actualPrice)*100).toFixed();
  }

  upperCase(productName:any){
    return productName.toUpperCase();
  }


  @Output()
 selectedProduct : EventEmitter<Product>= new EventEmitter<Product>();
  

  changeProductView(currentProduct:Product){
    this.selectedProduct.emit(currentProduct);

  }

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

}
