/**
 * New typescript file
 */
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonService {

    constructor(public http: HttpClient) {
        this.http = http;
    }

    parseRuDate(s) {
        let parts = s.split('-');
        if (parts.length != 3) {
          return new Date ();
        }

        parts[0] = parseInt(parts[0], 10);
        parts[1] = parseInt(parts[1], 10);
        parts[2] = parseInt(parts[2], 10);

        if (isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
          return new Date();
        }
        if (parts[0] < 0 || parts[1] < 0 || parts[2] < 0) {
          return new Date();
        }

        return new Date(parts[0], parts[1]-1, parts[2]);
    }

    getCurrency(startday, endday, id) {
      const start = this.parseRuDate(startday).toUTCString();
      const end = this.parseRuDate(endday).toUTCString();
      const myHeaders = new HttpHeaders();
      myHeaders.set('Content-Type', 'application/json');
      let myParams = new HttpParams();
      myParams = myParams.set ('startDate', start).set ('endDate', end);
      const url = 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/' + id ;

      return this.http.get(url, {headers: myHeaders, params: myParams});
    }
}