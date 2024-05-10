import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { OrderService } from '../_service/order.service';
import { MyOrderDetails } from '../_model/my-orders-model';
import { error, log } from 'console';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrl: './order-information.component.css'
})
export class OrderInformationComponent implements OnInit{

  orderDetails:MyOrderDetails[]=[];
  displayNoRecords:boolean=true;
  placed:boolean=true;
  
  constructor( private orderService:OrderService){}
  ngOnInit(): void {
    this.getAllOrderDetails();
    console.log(this.orderDetails);
    
    
  }


  getAllOrderDetails(){
    this.orderService.getAllOrderDetails().subscribe(
      (result)=>{
        this.orderDetails=result;
        if(this.orderDetails.length>0){
          this.displayNoRecords=false
        }else{
          this.displayNoRecords=true
        }
      },
      (error)=>{
        console.log(error);
        
      }
    );
    
  }
  markAsDelivered(orderId:number){
    console.log(orderId);
    this.orderService.markAsDelivered(orderId).subscribe(
    (error)=>{
      console.log(error);
    }
    );
    this.getAllOrderDetails();
  }
  getStatus(orderStatus:string){
    if(orderStatus==="Delivered"){
      this.placed=false;
      return "Delivered";
    }else{
      this.placed=true;
      return "Placed";
    }
  }

  getColorClass(orderStatus:string){
    if(orderStatus==="Delivered"){
      return "bg-success text-light";
    }else {
      return "bg-danger";
    }
  }

}
