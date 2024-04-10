import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { error } from 'console';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_service/image-processing.service';
import { Cart } from '../_model/cart';
import { response } from 'express';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private productService:ProductService,private imageProcess:ImageProcessingService){


  }

  cartItems:Cart[]=[];

  ngOnInit(): void {
   this.getCart();
  }

  getCart(){
    this.productService.getCartDetails().pipe(

      map((carts:any)=>{
        carts.map((cartItem:any)=>{
          this.imageProcess.createImages(cartItem.product);
          const item:Cart={cartId:cartItem.cartId,product:cartItem.product}
          this.cartItems.push(item);
        })
      })

    ).subscribe(
      (response)=>{
        console.log(response);
        console.log("Cart"+this.cartItems)
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }



  deleteCartItemById(cartId:number){
    this.productService.deleteCartById(cartId).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
        
      }
    )
    const index = this.cartItems.findIndex(element => element.cartId === cartId);
    if (index !== -1) {
        this.cartItems.splice(index, 1); // Remove one element at the found index
    }

  }


}
