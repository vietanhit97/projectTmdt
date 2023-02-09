import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-u-management',
  templateUrl: './u-management.component.html',
  styleUrls: ['./u-management.component.css'],
})
export class UManagementComponent implements OnInit {
  constructor(private proSer: ProductService) {}
  jwt: string = '';
  url: string = 'http://localhost:8089/';
  users: any[] = [];
  user: any = {};
  loadData() {
    this.jwt = sessionStorage.getItem('token')
      ? JSON.parse(sessionStorage.getItem('token') || '')
      : '';
    this.proSer
      .getFromApi(this.url + 'admin/getAllUsers', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.users = res;
        console.log(this.users);
      });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
