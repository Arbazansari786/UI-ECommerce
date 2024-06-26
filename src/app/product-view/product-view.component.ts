import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductService } from '../_service/product.service';
import { error } from 'console';
import { ImageProcessingService } from '../_service/image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  product:Product={
    productName:"",
    productDescription:"",
    productActualPrice:0,
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


}
