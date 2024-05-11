import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { ProductResolveService } from './product-resolve.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { resolve } from 'path';
import { BuyProductResolverService } from './_service/buy-product-resolver.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartComponent } from './cart/cart.component';
import { OrderInformationComponent } from './order-information/order-information.component';

const routes: Routes = [
  {
    path: "buyProduct",
    component: BuyProductComponent,
canActivate: [AuthGuardService], data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService
    }
  },{
    path: "myOrders",
    component: MyOrdersComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['User']}
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["User"] }
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["User"] }
  },

  {
    path: "register",
    component: RegisterComponent,
    canDeactivate: [AuthGuardService]
  },
  {
    path: "home",
    component: HomeComponent
  },

  {
    path: "",
    redirectTo:"home",
    pathMatch:"full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuardService], data: { roles: ['admin'] },

  },
  { path: 'ShowAllProducts', component: ShowAllProductComponent },
  {
    path: 'productView', component: ProductViewComponent, resolve: { product: ProductResolveService },
  },
  {
    path: "orderInformation",
    component: OrderInformationComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },


  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["user"] }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: { roles: ["admin"] }
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  },

  {
    path: "**",
    component: ForbiddenComponent
  }
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
