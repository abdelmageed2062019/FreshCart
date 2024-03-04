import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  baseUrl: string = "https://ecommerce.routemisr.com"

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  forgetPassword(userEmail: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, userEmail);
  }

  resetCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, resetCode);
  }

  resetPassword(data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}

