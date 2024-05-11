import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product';
import { Observable, map } from 'rxjs';
import { ProductResolveService } from '../product-resolve.service';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService:ProductService,
    private imageProcessingService:ImageProcessingService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id=route.paramMap.get("id");
    console.log("id is"+id);
    
    const isSingleProductCheckout=route.paramMap.get("isSingleProductCheckout")
    console.log(isSingleProductCheckout);
    
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Product[])=>x.map((product:Product)=>this.imageProcessingService.createImages(product))
      )
    );
  }
}
