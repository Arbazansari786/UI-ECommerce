import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { Observable, of } from 'rxjs';
import { OrderDetails } from '../_model/order-details-model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) {

  }

  base_url="http://localhost:9999";



  public addProduct(product:FormData){
   console.log("************   "+product);
   return this.httpClient.post<Product>(this.base_url+"/product/add",product);

  }

  public getAllProduct():Observable<Product[]>{
   console.log("Get All Products");
   return this.httpClient.get<Product[]>(this.base_url+"/product/allProducts");

  }

  public deleteProduct(productId:Number){
   return this.httpClient.delete(this.base_url+"/product/deleteProduct/"+productId,{responseType:'text'});
  }

  public getById(id:number){
    console.log("id is "+id);
    
   return this.httpClient.get<Product>(this.base_url+"/product/"+id);
  }

  public getProductDetails(isSingleProductCheckout:any,productId:any){
    console.log("isSingle");
    
    return this.httpClient.get<Product[]>(this.base_url+"/product/getProductDetails/"+isSingleProductCheckout+"/"+productId)
  }

  public addToCart(productId:any){
        return this.httpClient.get(this.base_url+"/cart/add/"+productId);
  }

  public getCartDetails(){
    return this.httpClient.get(this.base_url+"/cart/details");
  }

  public getCartCount(){
    return this.httpClient.get(this.base_url+"/cart/count")
  }

  public deleteCartById(cartId:number){
    return this.httpClient.delete(this.base_url+"/cart/delete/"+cartId);
  }

  public placeOrder(orderDetails:OrderDetails){
    return this.httpClient.post(this.base_url+"/order/placeOrder",orderDetails);
  }

}
