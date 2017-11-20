import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { Machine } from '../../common/model/machine';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Injectable()
export class MachineService {

  private machineRetrievalUrl = 'api/getMachines';
  private updateStatusMachineUrl = 'api/statusUpd';

  machine: Machine
  dateStruct: any = {};

  constructor(private http: Http) { }


  getMachines(): Observable<IMultiSelectOption[]> {
    return this.http.get(this.machineRetrievalUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStatus(status: String, machineId: String): Observable<Machine> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    //return new Observable<Machine>();
    return this.http.post(this.updateStatusMachineUrl, { status, machineId }, options)
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


}