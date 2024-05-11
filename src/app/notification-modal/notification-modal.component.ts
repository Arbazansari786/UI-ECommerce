import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowImageDialogComponent } from '../show-image-dialog/show-image-dialog.component';
import { QuantityUpdateModalComponent } from '../quantity-update-modal/quantity-update-modal.component';
import { ProductService } from '../_service/product.service';
import { Product } from '../_model/product';
import { Console } from 'console';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent implements OnInit{
  dataSource:any[]=[];
  isStockAvailable:boolean=true;

  constructor( private dialog:MatDialog,private dialogRef: MatDialogRef<NotificationModalComponent>,private productService:ProductService){}
  
  ngOnInit(): void {
    this.productService.getNotAvailableStock().subscribe(
      (result:Product[])=>{
        this.dataSource=result;
        console.log("not available stock");
        
        if(this.dataSource.length!=0){
          this.isStockAvailable=false;
        }else{
          this.isStockAvailable=true;
        }
      },
      (error)=>{
        console.log("error in notification data");
        
        console.log(error);
        
      }
    );
    
  }


  openQuantityUpdateModal(product:any){
    console.log(product);
    
    this.dialog.open(QuantityUpdateModalComponent, {
      data: {
        products:product
        
      },
      width:'500px',
      height:'450px'
    });
    
  }

  close(){
    this.dialogRef.close();
  }

  

}
