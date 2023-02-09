import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { LazyLoadScriptService } from '../service/lazy-load-script.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';

const route: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'user', component: UserComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'product', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'product/detail/:id', component: DetailComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'profile/:username', component: ProfileComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailComponent,
    MainComponent,
    CartComponent,
    CheckoutComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LazyLoadScriptService, ProductService],
})
export class UserModule {}
