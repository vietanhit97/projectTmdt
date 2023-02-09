import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PManagementComponent } from './main/p-management/p-management.component';
// import { ReportComponent } from './main/report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LazyLoadScriptService } from '../service/lazy-load-script.service';
// import { CManagementComponent } from './main/c-management/c-management.component';
// import { PDetalComponent } from './main/p-detal/p-detal.component';
// import { CDetailComponent } from './main/c-detail/c-detail.component';
import { ProductService } from '../service/product.service';
import { AuthGuardService } from '../service/auth-guard.service';
import { CManagementComponent } from './main/c-management/c-management.component';
import { InvoiceComponent } from './main/invoice/invoice.component';
import { InvoiceDetailComponent } from './main/invoice-detail/invoice-detail.component';
import { InvoiceManagementComponent } from './main/invoice-management/invoice-management.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UManagementComponent } from './main/u-management/u-management.component';
import { RManagementComponent } from './main/r-management/r-management.component';
import { UserDetailComponent } from './main/user-detail/user-detail.component';

const route: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'cmanagement', pathMatch: 'full' },
      { path: 'cmanagement', component: CManagementComponent },
      { path: 'pmanagement', component: PManagementComponent },
      { path: 'umanagement', component: UManagementComponent },
      { path: 'invoiceManagement', component: InvoiceManagementComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'invoice/details/:id', component: InvoiceDetailComponent },
      { path: 'umanagement/details/:id', component: UserDetailComponent },
    ],
    // canActivate: [AuthGuardService],
  },
];
@NgModule({
  declarations: [
    MainComponent,
    PManagementComponent,
    CManagementComponent,
    InvoiceComponent,
    InvoiceDetailComponent,
    InvoiceManagementComponent,
    UManagementComponent,
    RManagementComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(route),
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    LazyLoadScriptService,
    ProductService,
    DatePipe,
    AuthGuardService,
  ],
})
export class AdminModule {}
