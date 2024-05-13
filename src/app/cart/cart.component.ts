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

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
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

}
