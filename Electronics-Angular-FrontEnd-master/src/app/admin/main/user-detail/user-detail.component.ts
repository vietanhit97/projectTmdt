import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}
  user: any = {};
  invoice: any[] = [];
  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  loadData() {
    this.route.paramMap.subscribe((res) => {
      let id = res.get('id');
      this.proSer
        .getFromApi(this.url + 'admin/getAllUsers/' + id, 'Bearer ' + this.jwt)
        .subscribe((res) => {
          this.user = res;
          this.proSer
            .post(
              this.url + 'admin/getInvoiceByCustomer',
              this.user,
              'Bearer ' + this.jwt
            )
            .subscribe((res) => {
              console.log(this.user);
              this.invoice = JSON.parse(JSON.stringify(res));
              console.log(this.invoice);
            });
        });
    });
  }
  update() {
    this.proSer
      .putToApi(
        this.url + 'admin/updateUser/' + this.user.id,
        this.user,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        alert('update succeed!');
        this.loadData();
      });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
