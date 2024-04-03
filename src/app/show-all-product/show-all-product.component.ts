import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../_service/image-processing.service';
import { Product } from '../_model/product';
import { map } from 'rxjs';
import { ShowImageDialogComponent } from '../show-image-dialog/show-image-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-product',
  templateUrl: './show-all-product.component.html',
  styleUrl: './show-all-product.component.css'
})
export class ShowAllProductComponent implements OnInit {


  dataSource:any[]=[];
  jsonData:any;
  
  displayedColumns: string[] = ['productId','productName', 'description', 'productActualPrice', 'productDiscountedPrice','Actions'];

  constructor(private productService:ProductService,private dialog: MatDialog,private imageProcessing:ImageProcessingService,private route:Router){
      
  }
  ngOnInit(): void {
     this.getAllProduct();

  }

  public getAllProduct():any{

    this.productService.getAllProduct()
    .pipe(
      map((products:Product[])=>products.map((product:Product)=>this.imageProcessing.createImages(product)))
    )
    .subscribe(
      (response:Product[])=>{
        this.dataSource=response;
        console.log("datasource"+this.dataSource);


      },
      (error)=>{
        console.log(error);
      }
    )

  }


    public deleteProduct(productId:Number){

      this.productService.deleteProduct(productId).subscribe(
        (response)=>{
          // console.log("Delete Response"+response);
          this.getAllProduct();

        },
        (error)=>{
          console.log(error);
        }
      )

    }

    public showImageDialog(product:Product){

      console.log(product);
      this.dialog.open(ShowImageDialogComponent, {
        data: {
          products: product,
        },
        height: '500px',
        width: '500px',
      });

    }

    editProduct(productId:Number){
      console.log(productId);
      this.route.navigate(['/addNewProduct',{productId:productId}]);
    }


}
