import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, catchError, throwError} from "rxjs";
import { UserAuthService } from "./user-auth.service"; 
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private userAuth:UserAuthService,private router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  
        if(req.headers.get('No-Auth')==='True'){
            return next.handle(req.clone());
        }
        const token=this.userAuth.getJwtToken();
        console.log("token"+token);
        if(token!=null){
        req=this.addToken(req,token);
        }
    

        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse)=>{
                    console.log(err.status);
                    console.log(err);
                    if(err.status===401)
                        this.router.navigate(['/login']);
                    else if(err.status==403)
                        this.router.navigate(['forbidden']);
                    return throwError("Something went wrong")
                }
            )
        );
   
    }

    private addToken(req:HttpRequest<any>,token:string)
    {
            return req.clone(
                {
                    setHeaders:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
    }


}