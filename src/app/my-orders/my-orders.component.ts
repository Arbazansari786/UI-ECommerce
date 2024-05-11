import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { error, log } from 'console';
import { MyOrderDetails } from '../_model/my-orders-model';
import { IfStmt } from '@angular/compiler';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_service/image-processing.service';
import { OrderDetails } from '../_model/order-details-model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  notBlank:boolean=true;

  myOrders:MyOrderDetails[]=[];

  searchOrderText:string="";

  constructor(private productService:ProductService,private imageProcessingService:ImageProcessingService){}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  convertProductImages(order:MyOrderDetails){
    order.product= this.imageProcessingService.createImages(order.product);
      return order;
  }

  searchOrder(searchText:string){
      this.searchOrderText=searchText.toLowerCase();

  }

  isMatch(order:MyOrderDetails):boolean{
    if(this.searchOrderText!=""){
        if(order.product.productName.toLowerCase().includes(this.searchOrderText) || 
            order.product.productDescription.toLowerCase().includes(this.searchOrderText))
            return true;
        return false;
    }
    return true;

  }
  

  getOrderDetails(){
    this.productService.getOrders().pipe(
      map(
        (orders:MyOrderDetails[])=>orders.map(
          (order:MyOrderDetails)=>this.convertProductImages(order))) 
    ).subscribe(
      (result:MyOrderDetails[])=>{
        this.myOrders=result;
        console.log(result);
        if(this.myOrders.length>0){
          this.notBlank=true;
          console.log(this.notBlank);
          
        }else{
          this.notBlank=false;
          console.log(this.myOrders.length);
          
          console.log(this.notBlank);
          
        }
      },(error)=>{
        console.log(error);
      }
    );
    
    
  }

  upperCase(productName:string){
    return productName.toUpperCase();
  }

}
