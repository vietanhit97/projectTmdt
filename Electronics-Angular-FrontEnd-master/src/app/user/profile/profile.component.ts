import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}

  user: any = {};
  url: string = 'http://localhost:8089/';
  orders: any = {};
  invoice: any = {};
  subtotal: number = 0;
  loadInvoice(entity: any) {
    this.subtotal = 0;
    this.invoice = entity;
    this.invoice.invoiceDetails.forEach((element: any) => {
      this.subtotal += element.product.price * element.quantity;
    });
  }
  dueDate(input: string, int: number): Date {
    let date = new Date(input);
    let due = new Date();
    due.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + int);
    return due;
  }
  loadData() {
    this.route.paramMap.subscribe((response) => {
      let username = response.get('username');
      console.log(username);
      this.proSer
        .getFromApi(this.url + 'user/getUserInfoByName/' + username, '')
        .subscribe((res) => {
          this.user = res;
          console.log(this.user);
          let request = {
            customer: this.user.lastName + ' ' + this.user.firstName,
            contact: this.user.phone,
          };
          // console.log(request);
          this.proSer
            .post(this.url + 'user/getInvoiceByCustomer', request, '')
            .subscribe((res) => {
              this.orders = res;
              console.log(this.orders);
            });
        });
    });
  }
  logOut() {
    if (confirm('Are you sure you want to log out?')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('roles');
      window.location.href = 'user';
    }
  }
  ngOnInit(): void {
    // console.log(this.user);
    this.loadData();
  }
}
