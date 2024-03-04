import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItems: number = 0;
  wishListItems: number = 0;
  isLogin: boolean = false;
  userName: string = ""

  constructor(public _AuthService: AuthService, private _WishlistService: WishlistService, private _CartService: CartService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: (response: any) => {
        if (this._AuthService.userData.getValue() !== null) {
          console.log(response);

          this.isLogin = true;
          this.userName = response.name
        } else {
          this.isLogin = false;
        }
      }
    });


    this._CartService.getLoggedCart().subscribe({
      next: response => {
        console.log(response);

        this.cartItems = response.numOfCartItems;
      },
      error: err => {
        console.log(err);
      }
    });


    this._CartService.numOfCartItems.subscribe(
      (value) => {
        this.cartItems = value;
      }
    );

    /////////////

    this._WishlistService.getLoggedWishList().subscribe({
      next: response => {
        console.log(response);

        this.wishListItems = response.count;
      },
      error: err => {
        console.log(err);
      }
    });

    this._WishlistService.numOfWishListItems.subscribe(
      {
        next: (value) => {
          this.wishListItems = value;
        },
      }
    );

  }
}
