import { Component, inject } from '@angular/core';
import { User } from '../_model/user';
import { RegisterModel } from '../_model/register-model';
import { error, log } from 'console';
import { UserService } from '../_service/user.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  userService:UserService=inject(UserService);
  router:Router=inject(Router);

   user:RegisterModel={
    userEmail:"",
    userFirstName:"",
    userLastName:"",
    userPassword:"",
    userCity:"",
    userMobileNo:""
  }

  registerUser(){
    this.userService.registerUser(this.user).subscribe(
      (response:any)=>{
        console.log(response);
        
          alert("user is successfully register with email : "+response.data.userEmail);
          this.reset();
          this.router.navigate(['login']);
      },
      (error:any)=>{
        console.log(error);
        
        alert(error.error.message);

      }
    )
  }

  public reset(){
    this.user.userCity="",
    this.user.userEmail="",
    this.user.userFirstName="",
    this.user.userLastName="",
    this.user.userMobileNo="",
    this.user.userPassword=""
  }

  public canExit():boolean{
    if(this.user.userCity || this.user.userEmail || this.user.userMobileNo || this.user.userPassword
      || this.user.userFirstName || this.user.userLastName){
        return confirm("Your have unsaved changes. Are you sure you want to leave?")
      }
      return true;
       

  }

}
