import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAdressComponent } from './components/shipping-adress/shipping-adress.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'home' },
  { path: 'porductdetails/:id', canActivate: [authGuard], component: ProductDetailsComponent, title: 'productDetails' },
  { path: 'allOrders', canActivate: [authGuard], component: OrdersComponent, title: 'orders' },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: 'wishlist' },

  { path: 'products', canActivate: [authGuard], component: ProductsComponent, title: 'products' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'cart' },
  { path: 'orders', canActivate: [authGuard], component: OrdersComponent, title: 'orders' },

  { path: 'brands', canActivate: [authGuard], component: BrandsComponent, title: 'brands' },
  { path: 'shippingAddress/:id', canActivate: [authGuard], component: ShippingAdressComponent, title: 'shippingAddress' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'updateData', component: UpdateDataComponent, title: 'updateData' },
  { path: 'updatePassword', component: UpdatePasswordComponent, title: 'updatePassword' },

  { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'forgetPassword' },

  { path: 'resetPassword', component: ResetPasswordComponent, title: 'resetPassword' },

  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent, title: 'categories' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: '**', component: NotFoundComponent, title: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
