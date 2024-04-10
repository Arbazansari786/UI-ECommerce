import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../_service/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private header:HeaderComponent){

  }

  ngOnInit(): void {
      this.header.getCount();
  }
  
 

}
