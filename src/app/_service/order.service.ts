import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyOrderDetails } from '../_model/my-orders-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }


  base_url="http://localhost:9999";


  public getAllOrderDetails():Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>(this.base_url+"/order/allOrdersDetails");
  }

  public markAsDelivered(orderId:number){
    return this.httpClient.get(this.base_url+"/order/markAsDelivered/"+orderId);
  }
}
