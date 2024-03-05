import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "https://ecommerce.routemisr.com";
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.decodeUserToken();
  }

  decodeUserToken() {
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      const decodedToken: any = jwtDecode(userToken);
      this.userData.next(decodedToken);
    }
  }

  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  signin(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data).pipe(
      // Handle the response
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('userToken', response.token);
          this.decodeUserToken();
          this._Router.navigate(['/']); // Navigate to the home page or any desired route
          location.reload(); // Reload the page
        }
      })
    );
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
