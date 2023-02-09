import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private lzLoad: LazyLoadScriptService,
    private proSer: ProductService
  ) {}
  url: string = 'http://localhost:8089/';
  Denied: any[] = [];
  ToDo: any[] = [];
  OnDelivery: any[] = [];
  Completed: any[] = [];
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  loadInvoiceByStatus() {
    this.proSer
      .getFromApi(
        this.url + 'admin/getInvoiceByStatus/Denied',
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        this.Denied = res;
        console.log(this.Denied);
      });
    this.proSer
      .getFromApi(
        this.url + 'admin/getInvoiceByStatus/To Do',
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        this.ToDo = res;
        console.log(this.ToDo);
      });
    this.proSer
      .getFromApi(
        this.url + 'admin/getInvoiceByStatus/On Delivery',
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        this.OnDelivery = res;
        console.log(this.OnDelivery);
      });
    this.proSer
      .getFromApi(
        this.url + 'admin/getInvoiceByStatus/Completed',
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        this.Completed = res;
        console.log(this.Completed);
      });
  }
  ngOnInit(): void {
    this.lzLoad
      .loadScript('/assets/plugins/jquery/jquery.min.js')
      .subscribe((_) => {
        console.log('Jquery is loaded!');
      });
    this.lzLoad
      .loadScript('/assets/plugins/bootstrap/js/bootstrap.bundle.min.js')
      .subscribe((_) => {
        console.log('Bootstrap is loaded!');
      });
    // this.lzLoad
    //   .loadScript('/assets/plugins/ekko-lightbox/ekko-lightbox.min.js')
    //   .subscribe((_) => {
    //     console.log('Ekko Lightbox is loaded!');
    //   });
    // this.lzLoad
    //   .loadScript(
    //     '/assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'
    //   )
    //   .subscribe((_) => {
    //     console.log('overlayScrollbars is loaded!');
    //   });
    // this.lzLoad.loadScript('/assets/dist/js/adminlte.min.js').subscribe((_) => {
    //   console.log('AdminLTE App is loaded!');
    // });
    // this.lzLoad
    //   .loadScript('/assets/plugins/filterizr/jquery.filterizr.min.js')
    //   .subscribe((_) => {
    //     console.log('Filterizr is loaded!');
    //   });
    // this.lzLoad.loadScript('/assets/dist/js/demo.js').subscribe((_) => {
    //   console.log('demo is loaded!');
    // });
    this.loadInvoiceByStatus();
  }
}
