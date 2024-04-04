import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './_service/user.service';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { DragDirective } from './drag.directive';
import { ShowImageDialogComponent } from './show-image-dialog/show-image-dialog.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthInterceptorService } from './_service/auth-interceptor.service';
import { BuyProductComponent } from './buy-product/buy-product.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    ForbiddenComponent,
    LoginComponent,
    RegisterComponent,
    AddNewProductComponent,
    DragDirective,
    ShowImageDialogComponent,
    ProductViewComponent,
    ShowAllProductComponent,
    BuyProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
    
  ],
  providers: [
    UserService,
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService, multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
