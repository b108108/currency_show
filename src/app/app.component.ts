import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JsonService} from './json.service';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class cursy {
  id: number;
  code: number;
  name: string;
}

export class jsonD {
  Cur_ID: number;
  Date: string;
  Cur_OfficialRate: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JsonService]
})

export class AppComponent {
  //data: Array<{"Cur_ID": number, "Date":string, "Cur_OfficialRate": number}>;
  jsondata: any;
  
  results: Array<{}>;

  public valuta: cursy[] = [
      { id: 0, code: 145, name: 'USD' },
      { id: 1, code: 19, name: 'EUR' },
      { id: 2, code: 141, name: 'RUR' }
    ];
  
  public data: jsonD[] = [
      {Cur_ID: 145, Date: "2017-10-04T00:00:00", Cur_OfficialRate: 1.9655},
      {Cur_ID: 145, Date: "2017-10-05T00:00:00", Cur_OfficialRate: 1.9650},
      {Cur_ID: 145, Date: "2017-10-06T00:00:00", Cur_OfficialRate: 1.9629},
      {Cur_ID: 145, Date: "2017-10-07T00:00:00", Cur_OfficialRate: 1.9684}
    ];
  
  public showrow: cursy[] = [
    { id: 0, code: 145, name: 'USD' }
  ];
  
  private response: Subscription;
  private countRow: number;

  constructor(private jsonService: JsonService) {
    this.countRow = 0;
  }

  public selectedValuta: cursy = this.valuta[0];
  onSelect(itemId) {
      this.selectedValuta = null;
      for (let i = 0; i < this.valuta.length; i++) {
        if (this.valuta[i].code == itemId) {
          this.selectedValuta = this.valuta[i];
        }
      }
  }

  addrow() {
    if (this.countRow < 3) {
      this.countRow++;
      this.showrow[this.countRow] = this.valuta[this.countRow];
    }
  }
  
  removerow() {
    if (this.countRow > 0) {
      this.showrow[this.countRow] = null;
      this.countRow--;
    }
  }
  
  downloadRange(startday, endday) {
        this.jsonService.getCurrency(startday, endday, this.selectedValuta.code)
        .subscribe(data => {
            this.jsondata = data;
             console.log(data);
        },
        err => {
            console.log("Error download contacts");
        });
  }
}
