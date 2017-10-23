import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Http } from '@angular/http';

import { AppComponent } from './app.component';
import { JsonService } from './json.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Http,
    JsonService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
