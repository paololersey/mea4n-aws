import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CURRENT_INCOMES } from './mock-current-incomes';
import { TOTAL_CURRENT_INCOMES } from './mock-total-current-incomes';
import { Income } from '../model/income';
import { TotalIncome } from '../model/total-income';

@Injectable()
export class IncomeService {

  private getTableUrl = 'api/getTable';  // URL to web API
  private getTotalMoneyUrl = 'api/getTotalMoney';  // URL to web API

  constructor(private http: Http) {
    if(process.env.NODE_ENV==='development'){
      this.getTableUrl = 'http://localhost:4200/getTable'; 
      this.getTotalMoneyUrl = 'http://localhost:4200/getTotalMoney'; 
    }
   }

  getIncomes(): Observable<Income[]> {
    return this.http.get(this.getTableUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTotalCurrentIncomes(): Observable<TotalIncome> {
    return this.http.get(this.getTotalMoneyUrl)
      .map(this.extractData)
      .catch(this.handleError);
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

  getIncomesMock(): Promise<Income[]> {
    return Promise.resolve(CURRENT_INCOMES);
  }

  getTotalCurrentIncomesMock(): Promise<TotalIncome[]> {
    return Promise.resolve(TOTAL_CURRENT_INCOMES);
  }


}