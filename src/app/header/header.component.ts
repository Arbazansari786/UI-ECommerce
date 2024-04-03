import { Component } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { Role } from '../_model/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userAuth:UserAuthService,private router:Router){

  }

  public isLogged():boolean{
    return this.userAuth.isLoggedIn();
  }

  public logOut(){

     this.userAuth.clear();
     this.router.navigate(['/home']);

  }

  public isRoleMatched(role:string):boolean{
       role=role.toLowerCase();
      const roles:Role[]=this.userAuth.getRoles();

      for(let i=0;i<roles.length;i++){
        let roleName=roles[i].roleName.toLowerCase();
        if(roleName===role)
          return true;
      }
      return false;

  }

}
