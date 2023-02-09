import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(private lz: LazyLoadScriptService) {}

  cartTotal: number = 0;
  carts: any[] = [];
  loadData() {
    this.cartTotal = 0;
    this.carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    this.carts.forEach((element) => {
      this.cartTotal += element.product.price * element.quantity;
    });
    // console.log(this.cartTotal);
  }
  updateCart() {
    sessionStorage.setItem('carts', JSON.stringify(this.carts));
    this.update.emit();
  }
  removeItem(item: any) {
    let id = item.product.id;
    this.carts.forEach((element: { product: any; quantity: number }) => {
      if (element.product.id === id) {
        let index = this.carts.indexOf(element);
        // this.cartTotal -= element.product.price * element.quantity;
        this.carts.splice(index, 1);
        // sessionStorage.setItem('carts', JSON.stringify(this.carts));
        // this.loadData();
      }
    });
    // this.update.emit();
  }
  ngOnInit(): void {
    this.lz
      .loadScript('/assets/users/js/jquery.hoverIntent.min.js')
      .subscribe((_) => {
        console.log('hoverIntent loaded!');
      });
    this.lz
      .loadScript('/assets/users/js/jquery.waypoints.min.js')
      .subscribe((_) => {
        console.log('waypoints loaded!');
      });
    this.lz.loadScript('/assets/users/js/superfish.min.js').subscribe((_) => {
      console.log('superfish loaded!');
    });
    this.lz
      .loadScript('/assets/users/js/owl.carousel.min.js')
      .subscribe((_) => {
        console.log('owl.carousel loaded!');
      });
    this.lz;
    this.lz
      .loadScript('/assets/users/js/bootstrap-input-spinner.js')
      .subscribe((_) => {
        console.log('bootstrap-input-spinner loaded!');
      });
    this.loadData();
    // console.log(this.carts);
  }
}
