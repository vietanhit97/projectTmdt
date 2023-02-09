import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-c-management',
  templateUrl: './c-management.component.html',
  styleUrls: ['./c-management.component.css'],
})
export class CManagementComponent implements OnInit {
  constructor(private proSer: ProductService) {}
  categories: any[] = [];
  url: string = 'http://localhost:8089/';
  category: any = {
    id: 0,
    name: '',
  };
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  load() {
    this.proSer
      .getFromApi(this.url + 'admin/getAllCategories', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.categories = res;
        console.log(this.categories);
      });
  }
  loadDetails(id: number) {
    this.proSer
      .getFromApi(this.url + 'admin/getCategory/' + id, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.category.id = res.id;
        this.category.name = res.name;
      });
  }
  add(entity: any) {
    let cate: any = {
      name: entity.name,
    };
    this.proSer
      .post(this.url + 'admin/addCategory', cate, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        if (res != null) console.log(res);
        else console.log('failed!');
        this.load();
      });
  }
  remove(id: number) {
    if (
      confirm(
        'this will reset all related Products Category to Default. Proceed ?'
      )
    ) {
      this.proSer
        .deleteFromApi(
          this.url + 'admin/deleteCategory/' + id,
          'Bearer ' + this.jwt
        )
        .subscribe((res) => {
          // console.log(res.status);
          console.log(JSON.parse(res));
          this.category = {
            id: 0,
            name: '',
          };
          // this.load(0);
          this.load();
        });
    }
  }
  update(entity: any) {
    this.proSer
      .putToApi(
        this.url + 'admin/updateCategory/' + entity.id,
        entity,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        // this.load(0);
        this.load();
      });
  }
  ngOnInit(): void {
    this.load();
  }
}
