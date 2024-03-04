import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CategorySliderComponent } from './components/category-slider/category-slider.component'
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { ByPipe } from './by.pipe';
import { SpliceStringPipe } from './spliceString.pipe';
import { SearchPipe } from './search.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { ShippingAdressComponent } from './components/shipping-adress/shipping-adress.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { UpdateDataComponent } from './components/update-data/update-data.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProductDetailsComponent,
    CategorySliderComponent,
    MainSliderComponent,
    ByPipe,
    SpliceStringPipe,
    SearchPipe,
    PaginationComponent,
    ShippingAdressComponent,
    OrdersComponent,
    WishlistComponent,
    ForgetPasswordComponent,
    UpdatePasswordComponent,
    ResetPasswordComponent,
    DropdownComponent,
    UpdateDataComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
