import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { Product } from '../_model/product';
import { ProductService } from '../_service/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quantity-update-modal',
  templateUrl: './quantity-update-modal.component.html',
  styleUrl: './quantity-update-modal.component.css'
})
export class QuantityUpdateModalComponent implements OnInit{
  product:any;

  constructor(private productService:ProductService,private dialogRef: MatDialogRef<NotificationModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}
  
  ngOnInit(): void {
    this.product=this.data.products;
    console.log(this.product);
    
  }
  updateProduct(updateQtyForm:NgForm){
    console.log("data to be updated");
    
    console.log(this.product);
    
    this.productService.updateAvailableStock(this.product).subscribe(
      (result)=>{
        console.log(this.product);
        
      }
    );
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }
  

}
