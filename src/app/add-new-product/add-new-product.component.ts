import { Component,OnInit } from '@angular/core';
import { Product } from '../_model/product';
import { FileHandle } from '../_model/file-handle';
import { ProductService } from '../_service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent  {

  isUpdated=false;

  product:Product={
    productId:null,
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountedPrice:0,
    availableStock:0,
    productImages:[]

  }
  
  

  constructor(private productService:ProductService,private santizer:DomSanitizer,private route:ActivatedRoute){

  }

//   ngOnInit(): void {

//     this.product={
//       productId:null,
//       productName:"",
//       productDescription:"",
//       productActualPrice:0,
//       productDiscountedPrice:0,
//       productImages:[]
  
//     }
//    this.product= this.route.snapshot.data['product'];
//     if(this.product && this.product.productId){
//       this.isUpdated=true;
//     }

// }

  // public addProduct(productForm:NgForm){

  //   const productFormData:FormData=this.getFormData(this.product);

  //   this.productService.addProduct(productFormData).subscribe(
  //     (response:Product)=>{
  //       productForm.reset();
  //     },
  //     (error : HttpErrorResponse)=>{
  //       console.log(error)
  //     }


  //   );
  //   console.log("product added");

  // }

  // getFormData(product:Product):FormData{
  //   const formData=new FormData();
  //   formData.append(
  //     "product",
  //     new Blob([JSON.stringify(product)],{type: "application/json"})
  //   );

  //   for(var i=0;i<this.product.productImages.length;i++){
  //     formData.append(
  //       "imageFile",
  //       this.product.productImages[i].file,
  //       this.product.productImages[i].file.name
  //     )
  //   }

  //   return formData;

  // }

  // onFileSelected(event:any) {
  //     console.log(event);
      
  //     if(event.target.file){
  //       const actualFile=event.target.file[0];
  //      const fileHandle:FileHandle={
  //          file:actualFile,
  //         url:this.santizer.bypassSecurityTrustUrl(
  //           window.URL.createObjectURL(actualFile)  
  //         )
  //       }

  //       this.product.productImages.push(fileHandle);
  //     }
      
  // }
    
  addProduct(productForm: NgForm) {
    const formData = this.prepareFormDataForProduct(this.product);
    this.productService.addProduct(formData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteImg(i:number){
    this.product.productImages.splice(i,1);

  }

  prepareFormDataForProduct(product: Product): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    for (var i = 0; i < this.product.productImages.length; i++) {
      uploadImageData.append(
        "imageFile",
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      );
    }
    return uploadImageData;
  }

  onFileSelected(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.santizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandle);
    }
  }

  fileDropped(fileHandle:FileHandle){
    this.product.productImages.push(fileHandle);

  }

}
