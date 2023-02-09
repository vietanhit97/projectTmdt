import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';
type User = {
  name: string;
  // role: string;
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private lzLoad: LazyLoadScriptService) {}
  user: User = {
    name: '',
  };
  loadUser() {
    this.user.name = sessionStorage.getItem('username')
      ? sessionStorage.getItem('username') || ''
      : '';
    console.log(this.user);
  }
  logOut() {
    if (confirm('Are you sure you want to log out?')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('roles');
      window.location.href = 'user';
    }
  }
  ngOnInit(): void {
    this.lzLoad
      .loadScript('assets/plugins/jquery/jquery.min.js')
      .subscribe((_) => {
        console.log('Jquery is loaded!');
      });
    this.lzLoad
      .loadScript('assets/plugins/bootstrap/js/bootstrap.bundle.min.js')
      .subscribe((_) => {
        console.log('Bootstrap is loaded!');
      });
    this.lzLoad.loadScript('assets/dist/js/adminlte.min.js').subscribe((_) => {
      console.log('AdminLTE is loaded!');
    });
    // this.lzLoad.loadScript('assets/dist/js/demo.js').subscribe((_) => {
    //   console.log('DEMO is loaded!');
    // });
    this.loadUser();
  }
}
