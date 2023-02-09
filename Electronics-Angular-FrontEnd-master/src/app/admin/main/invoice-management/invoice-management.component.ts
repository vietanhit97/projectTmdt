import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
type Invoice = {
  id: number;
  customer: string;
  date: Date;
  ship: string;
  customerContact: number;
  shippingAddress: string;
  status: string;
  paymentMethod: string;
};
@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.css'],
})
export class InvoiceManagementComponent implements OnInit {
  constructor(private proSer: ProductService) {}
  toDate(input: Date): Date {
    let date = new Date(input);
    let due = new Date();
    due.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return due;
  }
  Invoices: any[] = [];
  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  loadData() {
    // console.log(this.jwt);
    this.proSer
      .getFromApi(this.url + 'admin/getAllInvoice', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.Invoices = res;
        console.log(this.Invoices);
      });
  }
  invoice: any = {
    id: 0,
    customer: '',
    date: '',
    ship: '',
    paymentMethod: '',
    customerContact: 0,
    shippingAddress: '',
    status: '',
  };

  loadInvoice(id: number) {
    this.proSer
      .getFromApi(this.url + 'admin/getInvoiceById/' + id, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.invoice = res;
        console.log(res);
      });
  }
  add(entity: any) {
    // entity.date = entity.date.toString();
    let invoice: any = {
      customer: entity.customer,
      date: this.toDate(entity.date),
      ship: entity.ship,
      customerContact: entity.customerContact,
      shippingAddress: entity.shippingAddress,
      status: entity.status,
      paymentMethod: entity.paymentMethod,
    };
    // console.log(invoice);
    this.proSer
      .post(this.url + 'admin/addInvoice', invoice, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        // console.log(entity);
        // console.log(res);
        this.loadData();
      });
  }
  update(entity: any) {
    // entity.date = entity.date.toString();
    let invoice: Invoice = {
      id: entity.id,
      customer: entity.customer,
      date: this.toDate(entity.date),
      ship: entity.ship,
      customerContact: entity.customerContact,
      shippingAddress: entity.shippingAddress,
      status: entity.status,
      paymentMethod: entity.paymentMethod,
    };
    // console.log(invoice);
    this.proSer
      .putToApi(
        this.url + 'admin/updateInvoice/' + invoice.id,
        invoice,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        // console.log(entity);
        // console.log(res);
        this.loadData();
      });
  }
  remove(entityId: number) {
    if (
      confirm(
        'Remove this invoice will remove its all invoice details. Proceed?'
      )
    ) {
      this.proSer
        .deleteFromApi(
          this.url + 'admin/deleteInvoice/' + entityId,
          'Bearer ' + this.jwt
        )
        .subscribe((res) => {
          console.log(res);
          this.loadData();
        });
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
}
