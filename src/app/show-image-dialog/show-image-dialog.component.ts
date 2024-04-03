import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-show-image-dialog',
  templateUrl: './show-image-dialog.component.html',
  styleUrl: './show-image-dialog.component.css'
})
export class ShowImageDialogComponent {

    
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }
   datas:any;
   productName:any;
  ngOnInit(): void {
    console.log('ngonokjbhjh*****************')
     this.productName=this.data.products.productName;
     console.log('productName'+this.productName);

    this.receivedData(this.data);
    this.datas=this.data.products.productImages;
    console.log(this.datas);
    console.log(this.productName);
  }

  receivedData(data:any){
      console.log(data)
  }


}
