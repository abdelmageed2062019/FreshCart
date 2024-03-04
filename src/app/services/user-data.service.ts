import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  baseUrl: string = "https://ecommerce.routemisr.com"
  headers = {
    token: localStorage.getItem("userToken") || ""
  }
  constructor(private _HttpClient: HttpClient) { }

  updateUserData(data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/updateMe/`, data, { headers: this.headers });
  }

  updatePassword(data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`, data, { headers: this.headers });
  }
}
