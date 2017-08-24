import { Component } from "@angular/core";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { ReportSearch } from '../model/reportSearch';
import { AngularBlobService } from '../service/blob.export.service';
import { ReportService } from '../service/report.service';
import { NgbdButtonsCheckbox } from '../../common/ngbd-buttons-checkbox';
import { CustomBrowserXhr } from '../service/custom.browser.xhr';
import { BrowserXhr } from '@angular/http';

@Component({
    selector: 'report',
    templateUrl: 'report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [AngularBlobService, ReportService ]
})
export class ReportComponent implements OnInit {

    model: ReportSearch;
    errorMessage: any = {};

    constructor(private reportService: ReportService, private angularBlobService: AngularBlobService) {
        this.model = new ReportSearch();
        this.model.groupByDay = true
    }


    triggerExcelReport(): void {
        this.model.dateFrom = this.reportService.transformDate(this.model.dateFrom);
        this.model.dateTo = this.reportService.transformDate(this.model.dateTo);
        this.angularBlobService.download(this.model);
    }

    ngOnInit(): void {
        //   this.triggerExcelReport();
    }

    /*triggerExcelReport(dateFrom: Date, dateTo: Date): Observable<I> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        //return new Observable<Machine>();
        return this.http.post(this.updateStatusMachineUrl, { status, machineId }, options)
          .map(this.extractData)
          .catch(this.handleError);
      }*/

}