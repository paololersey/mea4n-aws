import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { ReportSearch } from '../model/reportSearch';

@Injectable()
export class ReportService {

  private triggerReportIncomesByFilterUrl = 'api/getIncomesByFilter';
  reportSearch: ReportSearch
  dateStruct: any = {};

  constructor(private http: Http) { }

  triggerReportByFilter(reportSearch: ReportSearch): Observable<ReportSearch> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    //return new Observable<Machine>();
    return this.http.post(this.triggerReportIncomesByFilterUrl, { reportSearch }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  transformDate(dateStruct: any) : Date{
    return new Date(dateStruct.year, dateStruct.month-1, dateStruct.day);
  }



  /* utility methods */

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /* mocks */


}