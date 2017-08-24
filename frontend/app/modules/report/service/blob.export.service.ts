import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ReportSearch } from '../model/reportSearch';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver'

@Injectable()
export class AngularBlobService {

    private triggerReportIncomesByFilterUrl = 'api/getIncomesByFilter';
    reportSearch: ReportSearch

    constructor(private http: Http) {
    }


    download(model: ReportSearch) { //get file from service
        this.http.post(this.triggerReportIncomesByFilterUrl, model, {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: new Headers({ 'Content-Type': 'application/json' })
        }).subscribe(
            (response) => { // download file
                var blob = new Blob([response.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var filename = 'report.xlsx';
                saveAs(blob, filename);
            });
    }
}