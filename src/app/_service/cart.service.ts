import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  

  constructor(private productService:ProductService) {}

  cartCount:number=0;
  getCartCount():number{
    this.productService.getCartCount().subscribe(
      (response:any)=>{
        this.cartCount=response;
        console.log("cartCount"+this.cartCount);
        
      },
      (error)=>{
        console.log("Can't get the Cart Count");
      }
    )
    return this.cartCount
  }


}
