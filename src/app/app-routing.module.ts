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

const routes: Routes = [

  {
    path:"register",
    component:RegisterComponent,
    canDeactivate:[AuthGuardService]
  },
{
  path:"home",
  component:HomeComponent
},

{
  path:"",
  component:HomeComponent
},
{
  path:"login",
  component:LoginComponent
},
{path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuardService],data:{roles:['admin']},
  
},
{path:'ShowAllProducts', component:ShowAllProductComponent},
{path:'productView',component:ProductViewComponent,    resolve: { product: ProductResolveService },
},


{
  path:"user",
  component:UserComponent,
  canActivate:[AuthGuardService],
  data:{roles:["user"]}
},
{
  path:"admin",
  component:AdminComponent,
  canActivate:[AuthGuardService],
  data:{roles:["admin"]}
},
{
  path:"forbidden",
  component:ForbiddenComponent
},

{
  path:"**",
  component:ForbiddenComponent
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
