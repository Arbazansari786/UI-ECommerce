import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../_model/login';
import { LoginResponse } from '../_model/login-response';
import { Observable } from 'rxjs';
import { RegisterModel } from '../_model/register-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  base_url="http://localhost:9999"

  public login(loginData:Login):Observable<LoginResponse>{
    console.log("Login service");
    

    return this.httpClient.post<LoginResponse>(this.base_url+"/authenticate",loginData);

  }

  public registerUser(registerData:RegisterModel):any{

    console.log("Service for register");
    
    return this.httpClient.post(this.base_url+"/user/register",registerData);
  }

}
