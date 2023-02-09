import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Output() clickBuy: EventEmitter<any> = new EventEmitter<any>();
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}

  quantity: number = 1;
  addToCart(Product: any) {
    console.log(Product);
    console.log(this.quantity);
    const item = {
      product: Product,
      quantity: this.quantity,
    };
    let check: boolean = true;
    let carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    carts = carts.map((x: { product: { id: number }; quantity: number }) => {
      if (x.product.id == Product.id) {
        x.quantity += this.quantity;
        check = false;
      }
      return x;
    });
    if (check) {
      carts.push(item);
    }
    sessionStorage.setItem('carts', JSON.stringify(carts));
    this.clickBuy.emit();
  }
  product: any = {};
  // starRate: any[] = [];
  url: string = 'http://localhost:8089/';
  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      console.log(id);
      this.proSer
        .getFromApi(this.url + 'user/getProduct/' + id, '')
        .subscribe((res) => {
          this.product = res;
          // this.starRate = new Array(this.product.rate);
          console.log(this.product);
          // console.log(this.displayItem);
          // console.log(this.starRate);
        });
    });
  }
}
