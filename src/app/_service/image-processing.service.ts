import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../_model/product';
import { FileHandle } from '../_model/file-handle';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private domSanitizer:DomSanitizer) { }

  public createImages(product:Product){

   const productImages:any[]= product.productImages;

   const productImagetoFileHandle:FileHandle[]=[];

   for(let i=0;i<productImages.length;i++){

      const imageFileData=productImages[i];
        const imageBlob=this.dataURItoBlob(imageFileData.picByte,imageFileData.type);

       const imageFile= new File([imageBlob],imageFileData.name,{type:imageFileData.type})

       if (typeof window !== 'undefined') {
       const finalFileHandle:FileHandle={
        file:imageFile,
        url:this.domSanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        )
       };
       productImagetoFileHandle.push(finalFileHandle);
      }
   }

   product.productImages=productImagetoFileHandle;
   return product;
  }

  public dataURItoBlob(picByte:any,imageType:any){

    if (typeof window !== 'undefined') {
    const byteString=window.atob(picByte);

    const arrayBuffer=new ArrayBuffer(byteString.length);
    const int8Array=new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      int8Array[i]=byteString.charCodeAt(i);
    }
    
    const blob=new Blob([int8Array],{type:imageType});
    return blob;
  }
  return new Blob();

  }

}
