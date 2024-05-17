import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_service/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails= [];
  checkoutDetails:any;
  allowCheckout:boolean=false;

  constructor(private productService: ProductService,
    private router: Router) { }

    ngOnInit(): void {
      this.getCheckoutDetails();
      this.getCartDetails();
      
    }

  delete(cartId:number) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails();
      }, (err) => {
        console.log(err);
      }
    );
    this.ngOnInit();
    this.getCheckoutDetails();
    
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response:any) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {

    console.log("Checkout fun in cart");
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);

    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );
  }

  	
getCheckoutDetails(){
  this.productService.getCheckoutDetails().subscribe(
    (result)=>{
      this.checkoutDetails=result;
      if(this.checkoutDetails.numberOfItems<=0){
        this.allowCheckout=false;
      }else{
        this.allowCheckout=true
      }
    },(err)=>{
      console.log(err);
      
    }
  )
}

}
