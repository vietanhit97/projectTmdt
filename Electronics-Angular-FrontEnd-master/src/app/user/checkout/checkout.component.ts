import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @Output() order: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private proSer: ProductService,
    private route: Router
  ) {}
  regexNumber: string =
    '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$';
  frmBillingDetails: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    contact: [, [Validators.pattern(this.regexNumber), Validators.required]],
    shippingAddress: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
  });
  url: string = 'http://localhost:8089/';
  carts: any[] = [];
  cartTotal: number = 0;
  // shipping: string = 'Free Shipping';
  // payment: string = '';
  total: number = this.cartTotal;
  date: Date = new Date();
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  invoice: any = {
    date: this.date,
    ship: 'Free Shipping',
    paymentMethod: 'Direct bank transfer',
    status: 'To Do',
    customer: '',
    customerContact: 0,
    shippingAddress: '',
  };
  setPayment(param: string) {
    this.invoice.paymentMethod = param;
    // console.log(this.payment);
  }
  loadData() {
    let username = sessionStorage.getItem('username');
    if (username != null) {
      this.proSer
        .getFromApi(this.url + 'user/getUserInfoByName/' + username, '')
        .subscribe((res) => {
          console.log(res);
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.invoice.customerContact = res.phone;
          this.invoice.shippingAddress = res.address;
          this.email = res.email;
        });
    }
    this.carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    this.cartTotal = 0;
    this.carts.forEach((element) => {
      this.cartTotal += element.product.price * element.quantity;
    });
    this.total = this.cartTotal;
  }
  loadTotal() {
    switch (this.invoice.ship) {
      case 'Free Shipping':
        this.total = this.cartTotal;
        break;
      case 'Standard':
        this.total = this.cartTotal + 5;
        break;
      case 'Express':
        this.total = this.cartTotal + 10;
        break;
      case 'Urgent':
        this.total = this.cartTotal + 15;
        break;
      default:
        this.total = this.cartTotal;
        break;
    }
    // console.log(this.cartTotal);
    // console.log(this.total);
    // console.log(this.shipping);ư
  }
  placeOrder() {
    this.invoice.customer = this.lastName + ' ' + this.firstName;
    console.log(this.invoice);
    this.proSer
      .post(this.url + 'user/order', this.invoice, '')
      .subscribe((res) => {
        console.log(res);
        let inv = JSON.parse(JSON.stringify(res));
        // console.log(invoice.id);
        this.carts.forEach((element) => {
          let invoiceDetail = {
            product: {
              id: element.product.id,
            },
            invoice: {
              id: inv.id,
            },
            quantity: element.quantity,
          };
          this.proSer
            .post(this.url + 'user/orderDetails', invoiceDetail, '')
            .subscribe((res) => {
              console.log(res);
              sessionStorage.setItem('carts', '');
              this.order.emit();
              // if (res != null) {
              //   sessionStorage.setItem('carts', '');
              //   alert('order completed!');
              //   this.route.navigate(['/user/home/product']);
              // }
            });
        });
        alert('order completed!');
        this.route.navigate(['/user/home/product']);
      });
  }

  ngOnInit(): void {
    this.loadData();
    console.log(this.invoice);
  }
}
