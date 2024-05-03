import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { error, log } from 'console';
import { MyOrderDetails } from '../_model/my-orders-model';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  notBlank:boolean=true;

  myOrders:MyOrderDetails[]=[];

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getOrders().subscribe(
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
