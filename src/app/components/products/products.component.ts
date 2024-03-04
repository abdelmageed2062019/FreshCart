import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/interfaces/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productList: product[] = []
  isLoading: boolean = false
  currentPage: number = 1;
  numberOfPages: number = 1;
  numberOfItemPerPage: number = 9;
  term: string = ""
  wishList: Wishlist[] = []

  constructor(private _PorductService: ProductService, private _WishlistService: WishlistService, private toastr: ToastrService, private _CartService: CartService) { }


  ngOnInit(): void {
    this.getAllProduct()
    this.getAllWishlistItem()
  }

  getAllProduct() {
    this.isLoading = true;

    this._PorductService.getAllProducts(this.currentPage, this.numberOfItemPerPage).subscribe({
      next: response => {

        this.productList = response.data
        this.numberOfPages = response.metadata.numberOfPages
        this.isLoading = false
      },

      error: err => {
        console.log(err);
        this.isLoading = false

      }
    })
  }

  onPageChange(pageNumber: number): void {
    this.isLoading = true
    this.currentPage = pageNumber;
    this.getAllProduct();
    this.isLoading = false
  }

  addProductToCart(productId: string) {
    this.isLoading = true

    this._CartService.addProductToCart(productId).subscribe({
      next: response => {
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.toastr.success(response.message);
        this.isLoading = false

      },

      error: err => {
        console.log(err);
        this.isLoading = false
      }
    })
  }

  getAllWishlistItem() {
    this._WishlistService.getLoggedWishList().subscribe({
      next: response => {
        this.wishList = response.data
        console.log(this.wishList);
      },
      error: err => {
        console.log(err);

      }
    })
  }

  isProductInWishlist(productId: string): boolean {
    return this.wishList.some(item => item._id === productId);
  }

  toggleWithListBtn(productId: string) {
    this.isLoading = true

    if (this.isProductInWishlist(productId)) {
      this._WishlistService.removeProductFromWishList(productId).subscribe({
        next: response => {
          this.getAllWishlistItem()
          this._WishlistService.numOfWishListItems.next(response.data.length)

          this.toastr.error(response.message);
          this.isLoading = false

          console.log(response);

        }, error: err => {
          console.log(err);
          this.isLoading = false

        }
      })
    } else {
      this._WishlistService.addProductToWishList(productId).subscribe({
        next: response => {
          this.getAllWishlistItem()
          this.toastr.success(response.message);
          console.log(response);
          this.isLoading = false
        }, error: err => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }
}
