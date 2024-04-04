import { Component } from '@angular/core';
import { Login } from '../_model/login';
import { Form } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { error } from 'console';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../_model/login-response';
import { Role } from '../_model/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login:Login={
    userEmail:"admin001@gmail.com",
    userPassword:"Admin123"
  }

  constructor(private userService:UserService,private userAuth:UserAuthService,private router:Router){

  }

  getFormDetails(){
    console.log(this.login);
    this.userService.login(this.login).subscribe(
      (response:LoginResponse)=>{
        console.log(response);

        this.userAuth.setJwtToken(response.jwtToken);
        this.userAuth.setRoles(response.user.role);

        const roles:Role[]= response.user.role;

       
        const roleName=roles[0].roleName;
        if(roleName==="User")
            this.router.navigate(['/user']);
        else if(roleName==="Admin")
            this.router.navigate(['/admin']);
        else
            this.router.navigate(['/forbidden']);
      },
      (error)=>{
        console.log(error)  ;
        alert("Failed Authenticated");
      }
    )

    
  }



}
