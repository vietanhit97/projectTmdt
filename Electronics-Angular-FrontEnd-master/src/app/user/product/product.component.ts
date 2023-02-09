import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  // @Input() filter: any = {};
  constructor(private proSer: ProductService) {}
  sort: string = 'name';
  filter: any = {
    id: 0,
    name: '',
    cateId: 0,
  };
  categories: any[] = [];
  totalPages: number = 0;
  pages: any[] = [];
  pageData: any[] = [];
  state: any = {
    pageNumber: 0,
    pageSize: 0,
    pageLimit: 3,
    totalProducts: 0,
  };
  clickBuy(Product: any) {
    const item = {
      product: Product,
      quantity: 1,
    };
    let flag = true;
    let carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    carts = carts.map((x: { product: { id: number }; quantity: number }) => {
      if (x.product.id == Product.id) {
        x.quantity += 1;
        flag = false;
      }
      return x;
    });
    if (flag) {
      carts.push(item);
    }
    sessionStorage.setItem('carts', JSON.stringify(carts));
    this.addToCart.emit();
  }
  url: string = 'http://localhost:8089/';
  loadData(pageNumber: number) {
    // get categories
    this.proSer
      .getFromApi(this.url + 'user/getAllCategories', '')
      .subscribe((res) => {
        this.categories = res;
      });
    // console.log(this.filter);
    // get products
    this.proSer
      .post(
        this.url + 'user/product/filter/' + this.sort + '/' + pageNumber,
        this.filter,
        ''
      )
      .subscribe((response) => {
        let res: any = response;
        this.pageData = res.content;
        this.state = {
          pageNumber: res.number,
          pageSize: res.size,
          pageLimit: 3,
          totalProducts: res.totalElements,
        };
        this.totalPages = res.totalPages;
        this.pages.splice(0, this.pages.length);
        var maxLeft =
          this.state.pageNumber - Math.floor(this.state.pageLimit / 2);
        var maxRight =
          this.state.pageNumber + Math.floor(this.state.pageLimit / 2);
        if (maxLeft < 0) {
          maxLeft = 0;
          maxRight = this.state.pageLimit;
        }
        if (maxRight > this.totalPages) {
          maxLeft = this.totalPages - (this.state.pageLimit - 1);
          if (maxLeft < 0) {
            maxLeft = 0;
          }
          maxRight = this.totalPages;
        }
        for (let p = maxLeft; p <= maxRight; p++) {
          this.pages.push(p);
        }
        return this.pages;
      });
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.filter);
    this.loadData(0);
  }
  ngOnInit(): void {
    // this.initPager();
    this.filter.name = sessionStorage.getItem('filter');
    // console.log(this.filter);
    this.loadData(0);
  }
}
