import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
type invoiceDetail = {
  id: number;
  product: {
    id: number;
  };
  quantity: number;
  invoice: {
    id: number;
  };
};
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}

  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  invoice: any = {};
  invoiceDetails: any[] = [];
  subtotal: number = 0;
  // DetailProductId: number = 0;
  // DetailQuantity: number = 0;
  // due = new Date();
  dueDate(input: string, int: number): Date {
    let date = new Date(input);
    let due = new Date();
    due.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + int);
    return due;
  }
  // detail: invoiceDetail = {
  //   id: 0,
  //   productId: 0,
  //   quantity: 0,
  //   price: 0,
  //   invoiceId: 0,
  // };
  loadData() {
    this.subtotal = 0;
    this.route.paramMap.subscribe((res) => {
      let invoiceId = res.get('id');
      this.proSer
        .getFromApi(
          this.url + 'admin/getInvoiceById/' + invoiceId,
          'Bearer ' + this.jwt
        )
        .subscribe((response) => {
          this.invoice = response;
          this.invoiceDetails = response.invoiceDetails;
          console.log(this.invoice);
          console.log(this.invoiceDetails);
          this.invoiceDetails.forEach((element) => {
            this.subtotal += element.product.price * element.quantity;
          });
          // this.dueDate(response.date);
        });
    });
  }
  addDetail() {
    let detail: invoiceDetail = {
      id: 0,
      product: {
        id: 85,
      },
      quantity: 1,
      invoice: {
        id: this.invoice.id,
      },
    };
    this.proSer
      .post(this.url + 'admin/addInvoiceDetail', detail, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.loadData();
      });
  }

  // addRow() {
  //   var p = document.createElement('tr');
  //   p.innerHTML =
  //     '<td><input type="number"  class="detail-control" [(ngModel)]="DetailQuantity"></td><td><input type="number" class="detail-control"[(ngModel)]="DetailProductId"></td><td><button type="button" (click)="addDetail(DetailProductId,DetailQuantity,invoice.id)" class="btn btn-success btn-control"><i class="fas fa-download"></i></button></td>';
  //   document.querySelector('.table-details > tbody')?.appendChild(p);
  // }
  removeDetail(id: number) {
    if (
      confirm(
        'Remove this invoice detail will remove it from database. This transaction is irreversible. Proceed?'
      )
    ) {
      this.proSer
        .deleteFromApi(
          this.url + 'admin/deleteDetail/' + id,
          'Bearer ' + this.jwt
        )
        .subscribe((res) => {
          console.log(res);
          this.loadData();
        });
    }
  }
  updateDetail(entity: any) {
    let invoiceDetail = {
      id: entity.id,
      product: {
        id: entity.product.id,
      },
      invoice: {
        id: this.invoice.id,
      },
      quantity: entity.quantity,
    };
    console.log(invoiceDetail);
    this.proSer
      .putToApi(
        this.url + 'admin/updateInvoiceDetail/' + invoiceDetail.id,
        invoiceDetail,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        this.loadData();
      });
  }
  // Trừ đi 1 ngày
  ngOnInit(): void {
    this.loadData();
  }
}
