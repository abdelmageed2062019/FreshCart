import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl: string = "https://ecommerce.routemisr.com"
  userData: any = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken")) {
      this.decodeUserToken()
    }
  }


  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem("userToken"));
    let decodeToken = jwtDecode(userToken)

    this.userData.next(decodeToken);
    console.log(this.userData);
  }
  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  signin(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }



  logOut() {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(["/login"])
  }


}
