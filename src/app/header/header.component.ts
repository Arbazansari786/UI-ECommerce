import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { Role } from '../_model/role';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ShowImageDialogComponent } from '../show-image-dialog/show-image-dialog.component';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { ProductService } from '../_service/product.service';
import { Product } from '../_model/product';
import { error } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  dataSource:any[]=[];
  notificationCount:number | undefined;
  displayRedDot:boolean=false;

  constructor(private userAuth:UserAuthService,private router:Router,private dialog: MatDialog,private productService:ProductService){

  }
  ngOnInit(): void {
    this.getNotificationCount();
  }

  getNotificationCount(){
    if(this.userAuth.isAdmin()){
      this.productService.getNotAvailableStock().subscribe(
        (result:Product[])=>{
          this.dataSource=result;
          this.notificationCount=this.dataSource.length;
          if(this.notificationCount>0){
            this.displayRedDot=true;
          }else{
            this.displayRedDot=false;
          }
        },
        (error)=>{
          console.log("error in count");
          
          console.log(error);
          
        }    
      );
    }
    
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
 


  

  notification(){
    this.dialog.open(NotificationModalComponent, {
      data: {
     
      },
      position:{right:'10px',top:'60px'}
    });
  }

  isAdmin():boolean{
    return this.userAuth.isAdmin();
  }

}
