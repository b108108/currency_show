import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { JsonService } from './json.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class cursy {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  data: Array<{id: number, date: string, num: string}>;
  results: string[];
  public valuta: cursy[] = [
      { id: 145, name: 'USD' },
      { id: 19, name: 'EUR' },
      { id: 141, name: 'RUR' }
    ];

  constructor(private http: Http, private jsonService: JsonService) {
    this.data = [
      {id: 145, date: '20/10/2017', num: '21'},
      {id: 19, date: '21/10/2017', num: '10'},
      {id: 141, date: '21/10/2017', num: '35'},
      {id: 145, date: '21/10/2017', num: '22'},
    ];
  }

  public selectedValuta: cursy = this.valuta[0];
  onSelect(itemId) {
      this.selectedValuta = null;
      for (let i = 0; i < this.valuta.length; i++) {
        if (this.valuta[i].id == itemId) {
          this.selectedValuta = this.valuta[i];
        }
      }
  }

  downloadRange(startday, endday) {

    const uri = 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/' + this.selectedValuta.id;
    const param = { 'startDate': startday.toUTCString(), 'endDate': endday.toUTCString() };
    console.log(startday + '---' + endday);
    const headers      = new Headers({ 'Content-Type': 'application/json' });

        this.jsonService.getCurrency(uri, param).subscribe(data => this.results = data);
    /*
    this.http.get(uri, param )

        .map(res => res.json())
        .subscribe(res => {
            this.results = res.data;

        },
        err => {
            console.log("Error download contacts");
        });
     */
  }

}
