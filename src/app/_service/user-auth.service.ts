import { Injectable } from '@angular/core';
import { Role } from '../_model/role';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {


  
  constructor() { }
  public setRoles(roles:Role []){
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorage.setItem("roles",JSON.stringify(roles));
    }
  }
  public getRoles():Role[]{
    
    let roles:string|null=null;
    if (typeof window !== 'undefined') {
       roles=localStorage.getItem("roles");

    }
    if(roles==null)
        return [];
    return JSON.parse(roles);
  }

  public setJwtToken(jwtToken:string){
    if (typeof window !== 'undefined') {
      localStorage.setItem("jwtToken",jwtToken);
    }


  }

  public getJwtToken():string|null{

    if (typeof window !== 'undefined') {
      if(localStorage.getItem('jwtToken'))
      return localStorage.getItem('jwtToken');


    }
    return null;
  }

  public isLoggedIn():boolean{

    if (typeof window !== 'undefined') {
      if(localStorage.getItem("jwtToken")!=undefined&& localStorage.getItem("roles")!=undefined)
      return true;


    }
    return false;
   
  }

  public isUser():boolean{
   
    const roles=this.getRoles();
    if(roles==null)
      return false;
    return roles[0].roleName==="User";
  }
  public isAdmin():boolean{
   
    const roles=this.getRoles();
    if(roles==null)
      return false;
    return roles[0].roleName==="Admin";
  }

  public clear(){
    if (typeof window !== 'undefined') {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("roles");
  
    }

  }
  

}
