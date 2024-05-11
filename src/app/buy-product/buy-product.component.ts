import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product';
import { log } from 'console';
import { ProductResolveService } from '../product-resolve.service';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{

  isSingleProductCheckout :any;

  productDetails:Product[]=[];
  disablePlaceOrderButton:boolean=false;


  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }


  constructor(private dialog: MatDialog,private activatedRoute:ActivatedRoute,
    private productService:ProductService,private route:Router,private injector: Injector
    ){

  }
  ngOnInit(): void {
    console.log("Product initialiazed started");
    
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    

    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
    console.log("Product initialiazed finisher");

    
    
  }

  placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.route.navigate(["/orderConfirm"]);
          }
        );

      },
      (err)=>{
        console.log(err);
        
      }
    );
    this.route.navigate(['/myOrders']);
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
    
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId===productId
    );
    const qty=filteredProduct[0].quantity=quantity;
    const filteredStockData=this.productDetails.filter((product)=>product.productId===productId);
    if(filteredStockData[0].availableStock<quantity){
      this.disablePlaceOrderButton=true;
      console.log(filteredStockData[0].availableStock);
      alert("Only "+filteredStockData[0].availableStock+" quantity available and you selected "+quantity);
    }else{
      this.disablePlaceOrderButton=false;
    }
    
    return qty;
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
 