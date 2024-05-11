import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  disableBuyNow:boolean=false;

  product:Product={
    productName:"",
    productDescription:"",
    productActualPrice:0,
    availableStock:0,
    productDiscountedPrice:0,
    productImages:[]
  };

  selectIndex:number=0;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(i:number){
    this.selectIndex=i;
  }

  buyProduct(productId:any){
    console.log("buy product ts");
    console.log(productId);
    
    
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,productId:productId
    }]);
  }

  upperCase(productName:string){
    return productName.toUpperCase();
  }

  discountPercentage(productDiscountedPrice:number,productActualPrice:number){
    const discountAmt=productActualPrice-productDiscountedPrice;
    return Math.round((discountAmt/productActualPrice)*100).toFixed();
  }

  saving(productDiscountedPrice:number,productActualPrice:number){
    return productActualPrice-productDiscountedPrice;
  }

  getDetails(availableStock:number){
    if(availableStock!=0){
      this.disableBuyNow=false;
      return "Only "+availableStock+" items left";
    }else{
      this.disableBuyNow=true;
      return "Out of stock";
    }
  }

  changeCurrentproduct(product:Product){

    console.log("change Product");
    this.product=product;

    
  }


}
