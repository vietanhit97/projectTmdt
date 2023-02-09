import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';
import { ProductService } from 'src/app/service/product.service';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DetailComponent } from '../detail/detail.component';
import { ProductComponent } from '../product/product.component';
import { ProfileComponent } from '../profile/profile.component';
// type Users = {
//   id: 0;
//   firstName: '';
//   lastName: '';
//   username: '';
//   password: '';
//   address: '';
//   email: '';
//   phone: 0;
// };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filter: any = {
    id: 0,
    name: sessionStorage.getItem('filter'),
    cateId: 0,
  };
  carts: any[] = [];
  cartTotal: number = 0;
  search() {
    console.log(this.filter);
    // this.route.navigate(['/user/home/product']);
    sessionStorage.setItem('filter', this.filter.name);
    window.location.href = 'user/home/product';
  }
  onActive(componentRef: any) {
    if (componentRef instanceof ProductComponent) {
      // [someInput]="inputValue"
      // componentRef.filter = this.filter;
      // componentRef.loadData(0);
      componentRef.addToCart.subscribe(() => {
        this.carts = sessionStorage.getItem('carts')
          ? JSON.parse(sessionStorage.getItem('carts') || '{}')
          : [];
        // console.log(this.carts);
        this.cartTotal = 0;
        this.carts.forEach((element: { product: any; quantity: number }) => {
          this.cartTotal += element.product.price * element.quantity;
        });
        // console.log(this.cartTotal);
      });
    }
    if (componentRef instanceof CartComponent) {
      componentRef.update.subscribe(() => {
        this.carts = sessionStorage.getItem('carts')
          ? JSON.parse(sessionStorage.getItem('carts') || '{}')
          : [];
        // console.log(this.carts);
        this.cartTotal = 0;
        this.carts.forEach((element: { product: any; quantity: number }) => {
          this.cartTotal += element.product.price * element.quantity;
        });
        // console.log(this.cartTotal);
      });
    }
    if (componentRef instanceof CheckoutComponent) {
      componentRef.order.subscribe(() => {
        this.carts = sessionStorage.getItem('carts')
          ? JSON.parse(sessionStorage.getItem('carts') || '{}')
          : [];
        // console.log(this.carts);
        this.cartTotal = 0;
        this.carts.forEach((element: { product: any; quantity: number }) => {
          this.cartTotal += element.product.price * element.quantity;
        });
      });
    }
    if (componentRef instanceof DetailComponent) {
      componentRef.clickBuy.subscribe(() => {
        this.carts = sessionStorage.getItem('carts')
          ? JSON.parse(sessionStorage.getItem('carts') || '{}')
          : [];
        // console.log(this.carts);
        this.cartTotal = 0;
        this.carts.forEach((element: { product: any; quantity: number }) => {
          this.cartTotal += element.product.price * element.quantity;
        });
        // console.log(this.cartTotal);
      });
    }
    if (componentRef instanceof ProfileComponent) {
      componentRef.user = this.user;
    }
  }
  constructor(
    private lz: LazyLoadScriptService,
    private us: ProductService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  regexNumber: string =
    '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$';
  frmRegister: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: [0, [Validators.required, Validators.pattern(this.regexNumber)]],
    confirm: [false, [Validators.required, Validators.requiredTrue]],
  });
  register() {
    this.user.username = this.user.email;
    this.us
      .postToApi(this.url + 'user/register', this.user)
      .subscribe((response) => {
        let token: String = response;
        console.log(token);
        if (token == 'Success!') {
          if (confirm('Register completed ! Do you want to login?')) {
            this.login();
          } else {
            window.location.href = 'user';
          }
        }
      });
  }
  user: any = {
    id: 0,
    firstName: '',
    lastName: '',
    username: 'username',
    password: 'password',
    address: '',
    email: '',
    phone: 0,
    review: [],
  };
  displayname: string = 'Sign In/Register';
  checkLogin(): boolean {
    if (this.displayname == 'Sign In/Register') {
      return false;
    } else return true;
  }
  categories: any[] = [];
  jwt: string = '';
  url: string = 'http://localhost:8089/';
  // roles: string[] = [];
  login() {
    this.us
      .postToApi(this.url + 'user/api/token', this.user)
      .subscribe((response) => {
        let token: String = response;
        console.log(token);
        sessionStorage.setItem('token', JSON.stringify(token));
        this.jwt = 'Bearer ' + token;
        this.us
          .post(this.url + 'user/api/validateUser', this.user, this.jwt)
          .subscribe((res) => {
            console.log(res);
            let roles = JSON.parse(JSON.stringify(res));
            console.log(roles);
            sessionStorage.setItem('roles', JSON.stringify(roles));
            for (let i = 0; i < roles.length; i++) {
              if (roles[i] == 'ADMIN') {
                window.location.href = 'admin';
                sessionStorage.setItem('username', this.user.username);
                console.log(this.user);
                return;
              } else {
                window.location.href = 'user';
                sessionStorage.setItem('username', this.user.username);
              }
            }
          });
      });
  }
  navigate() {
    let roles = sessionStorage.getItem('roles')
      ? JSON.parse(sessionStorage.getItem('roles') || '{}')
      : [];
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == 'ADMIN') {
        window.location.href = 'admin';
        return;
      } else {
        console.log(this.user);
        this.route.navigate(['/user/home/profile/' + this.displayname]);
      }
    }
  }
  loadData() {
    this.carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    this.cartTotal = 0;
    this.carts.forEach((element: { product: any; quantity: number }) => {
      this.cartTotal += element.product.price * element.quantity;
    });
    this.us
      .getFromApi(this.url + 'user/getAllCategories', '')
      .subscribe((response) => {
        this.categories = response;
        // console.log(this.categories);
      });
    // console.log(this.cartTotal);
  }
  removeFromCart(item: any) {
    let id = item.product.id;
    this.carts.forEach((element: { product: any; quantity: number }) => {
      if (element.product.id === id) {
        let index = this.carts.indexOf(element);
        this.cartTotal -= element.product.price * element.quantity;
        this.carts.splice(index, 1);
        sessionStorage.setItem('carts', JSON.stringify(this.carts));
        this.loadData();
      }
    });
  }
  ngOnInit(): void {
    // <!-- Plugins JS File -->
    this.lz.loadScript('assets/users/js/jquery.min.js').subscribe((_) => {
      console.log('jquery loaded!');
    });
    this.lz
      .loadScript('assets/users/js/bootstrap.bundle.min.js')
      .subscribe((_) => {
        console.log('bootstrap loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.hoverIntent.min.js')
      .subscribe((_) => {
        console.log('jquery.hoverIntent loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.waypoints.min.js')
      .subscribe((_) => {
        console.log('jquery.waypoints.min.js loaded!');
      });
    this.lz.loadScript('assets/users/js/superfish.min.js').subscribe((_) => {
      console.log('superfish.min.js loaded!');
    });
    this.lz.loadScript('assets/users/js/owl.carousel.min.js').subscribe((_) => {
      console.log('owl.carousel.min.js loaded!');
    });
    this.lz
      .loadScript('assets/users/js/bootstrap-input-spinner.js')
      .subscribe((_) => {
        console.log('bootstrap-input-spinner.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.plugin.min.js')
      .subscribe((_) => {
        console.log('jquery.plugin.min.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.magnific-popup.min.js')
      .subscribe((_) => {
        console.log('jquery.magnific-popup.min.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.countdown.min.js')
      .subscribe((_) => {
        console.log('jquery.countdown.min.js loaded!');
      });
    // <!-- Main JS File -->
    this.lz.loadScript('assets/users/js/main.js').subscribe((_) => {
      console.log('main.js loaded!');
    });
    this.lz.loadScript('assets/users/js/demos/demo-3.js').subscribe((_) => {
      console.log('demo-3.js loaded!');
    });
    let check = sessionStorage.getItem('username');
    // console.log(check);
    if (check != null && check != '') {
      this.displayname = check;
      // console.log(this.displayname);
    }
    // this.getUser();
    // console.log(this.carts);
    this.loadData();
  }
}
