import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Orders } from 'src/app/interfaces/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  userId: string = ""
  ordersList: Orders[] = []
  userName: string = "{}"
  isLoading: boolean = false


  constructor(private authService: AuthService, private _PaymentService: PaymentService) { }

  ngOnInit(): void {
    this.authService.userData.subscribe((response: any) => {
      this.userId = response.id;
      this.userName = response.name;
    });
    this.getUserOrders(this.userId)
  }

  getUserOrders(userId: string) {
    this.isLoading = true
    return this._PaymentService.getUserOrders(userId).subscribe({
      next: response => {
        this.ordersList = response
        this.isLoading = false
      },
      error: err => {
        this.isLoading = false
      }
    })
  }
}
