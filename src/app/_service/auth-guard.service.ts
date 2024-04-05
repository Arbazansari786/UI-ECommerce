import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Role } from '../_model/role';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,CanDeactivate<RegisterComponent> {

  public isRoleMatched(matchingRole:string[]):boolean{
   const roles:Role[]=this.userAuth.getRoles();
    
   for(let i=0;i<roles.length;i++){
     let roleName=roles[i].roleName.toLowerCase();
    for(let j=0;j<matchingRole.length;j++){
      if(roleName===matchingRole[j].toLowerCase())
        return true;
    }
   }
   return false;

}

  constructor(private userAuth:UserAuthService) { }
  

  router:Router=inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {

    if(this.userAuth.getJwtToken()!=null){
     const roles= route.data["roles"];
     if(this.isRoleMatched(roles))
        return true;
     else{
    this.router.navigate(['/forbidden']);
    return false;
     }
    }
    this.router.navigate(['/login'])
    return false;


  }


  canDeactivate(component: RegisterComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean  {
    
    return component.canExit();    

  }

}
