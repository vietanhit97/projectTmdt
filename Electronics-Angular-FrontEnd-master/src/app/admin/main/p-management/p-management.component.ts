import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-p-management',
  templateUrl: './p-management.component.html',
  styleUrls: ['./p-management.component.css'],
})
export class PManagementComponent implements OnInit {
  constructor(private proSer: ProductService, private datepipe: DatePipe) {}
  products: any[] = [];
  emp: any = {};
  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  load() {
    this.emp = {};
    this.proSer
      .getFromApi(this.url + 'admin/getAllProducts', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.products = res;
      });
  }
  loadDetail(id: any) {
    this.proSer
      .getFromApi(this.url + 'admin/getProduct/' + id, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.emp.id = res.id;
        this.emp.name = res.name;
        this.emp.des = res.des;
        this.emp.rate = res.rate;
        this.emp.status = res.status;
        this.emp.color = res.color;
        this.emp.spec = res.spec;
        this.emp.stock = res.stock;
        this.emp.price = res.price;
        this.emp.image = res.image;
        this.emp.cateId = res.category.id;
      });
  }
  add(entity: any) {
    let product: any = {
      name: entity.name,
      des: entity.des,
      rate: entity.rate,
      status: entity.status,
      color: entity.color,
      spec: entity.spec,
      stock: entity.stock,
      price: entity.price,
      image: entity.image,
      category: {
        id: entity.cateId,
      },
    };
    if (entity.cateId <= 0 || entity.cateId == null) {
      product.category.id = 6;
    }
    console.log(product);
    console.log(entity.cateId);
    this.proSer
      .post(this.url + 'admin/addProduct', product, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        if (res != null) console.log(product);
        else console.log('failed!');
        // this.load(0);
        this.load();
      });
  }
  remove(id: any) {
    this.proSer
      .getFromApi(
        this.url + 'admin/getInvoiceDetailByProductId/' + id,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        if (res.length > 0) {
          alert(
            'This product already exist on certain invoices therefore it cannot be deleted!'
          );
        } else {
          this.proSer
            .deleteFromApi(
              this.url + 'admin/deleteProduct/' + id,
              'Bearer ' + this.jwt
            )
            .subscribe((res) => {
              // console.log(res.status);
              console.log(JSON.parse(res));
              this.emp = {
                id: 0,
                name: '',
                des: '',
                rate: 0,
                status: 0,
                color: '',
                spec: '',
                stock: 0,
                price: 0,
                image: '',
                category: {
                  id: 0,
                },
              };
              // this.load(0);
              this.load();
            });
        }
      });
  }
  update(entity: any) {
    let product: any = {
      name: entity.name,
      des: entity.des,
      rate: entity.rate,
      status: entity.status,
      color: entity.color,
      spec: entity.spec,
      stock: entity.stock,
      price: entity.price,
      image: entity.image,
      category: {
        id: entity.cateId,
      },
    };
    this.proSer
      .putToApi(
        this.url + 'admin/updateProduct/' + entity.id,
        product,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        // this.load(0);
        this.load();
      });
  }
  // fileName = '';
  onFileSelected(event: any) {
    var file: File = event.target.files[0];
    this.emp.image = file.name;
    console.log(file);
  }
  ngOnInit(): void {
    // this.load(0);
    this.load();
  }
}
