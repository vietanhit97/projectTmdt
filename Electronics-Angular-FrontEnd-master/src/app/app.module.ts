import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './service/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
