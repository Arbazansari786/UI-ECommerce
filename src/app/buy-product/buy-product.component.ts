import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details-model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product';
import { log } from 'console';
import { ProductResolveService } from '../product-resolve.service';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{

  productDetails:Product[]=[];


  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }


  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductService
    ){

  }
  ngOnInit(): void {
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
    
    
  }

  placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
      },
      (err)=>{
        console.log(err);
        
      }
    );
  }
  getQuantityForProduct(productId:any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId
    );
    return filteredProduct[0].quantity;
  }
  getCalculatedTotal(productId:any,productDiscountedPrice:any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId
    );
    return filteredProduct[0].quantity*productDiscountedPrice;
  }

  onQuantityChanged(quantity:any,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId===productId
    )[0].quantity=quantity;
  }

  getCalculatedGrandTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price=this.productDetails.filter(product=>product.productId===productQuantity.productId)[0].productDiscountedPrice
        grandTotal=grandTotal+(price*productQuantity.quantity);
      }
    );
    return grandTotal;
  }

}
 