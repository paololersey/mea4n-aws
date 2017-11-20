import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { ReportSearch } from '../model/reportSearch';
import { AngularBlobService } from '../service/angular-blob.service';
import { ReportService } from '../service/report.service';
import { BrowserXhr } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MACHINE_NICE, ERRORS_NICE, YEARS, MONTHS, MONTHDAYS, WEEKDAYS, HOURS } from '../service/constants.service';
import { DatepickerPopupComponent } from '../../common/datepicker-popup.component';
import { MachineService } from '../../common/service/machine.service';
import { ErrorMapService } from '../../common/service/error-map.service';
import { DialogModalService } from '../../common/service/dialog-modal.service'


import { Machine } from '../../common/model/machine';
import { NgbDateITParserFormatter } from "../../common/ngb-date-it-parser-formatter"

@Component({
    selector: 'report',
    templateUrl: 'report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [NgbDatepickerConfig,
        { provide: NgbDateParserFormatter, useClass: NgbDateITParserFormatter }]
})
export class ReportComponent implements OnInit {

    model: ReportSearch;
    modelSentToServer: ReportSearch
    machineList: IMultiSelectOption[]
    errorList: IMultiSelectOption[]
    yearsList: IMultiSelectOption[]
    monthsList: IMultiSelectOption[]
    monthDaysList: IMultiSelectOption[]
    weekDaysList: IMultiSelectOption[]
    hoursList: IMultiSelectOption[]
    showMessagesFilters: Boolean
    showDialog: Boolean
    errorMessage: any = {}
    content: any = {}
    //messageToDialog : String 

    @Output() messageToDialog = new EventEmitter();

    constructor(private reportService: ReportService,
        private angularBlobService: AngularBlobService,
        private machineService: MachineService,
        private errorService: ErrorMapService,
        private dialogModalService: DialogModalService,
        config: NgbDatepickerConfig,
        ngbDateParserFormatter: NgbDateParserFormatter) {
        this.model = new ReportSearch();
        this.model.groupByDay = true
        config.minDate = { year: 2017, month: 1, day: 1 };
        config.maxDate = { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate() };
    }


    triggerExcelReport(): void {

        // VALIDATION: 
        // - dateFrom and dateTo always mandatory; 

        this.modelSentToServer = JSON.parse(JSON.stringify(this.model))
        this.modelSentToServer.dateFrom = this.reportService.transformDate(this.model.dateFrom);
        this.modelSentToServer.dateTo = this.reportService.transformDate(this.model.dateTo);
        if (this.modelSentToServer.dateFrom.valueOf() > this.modelSentToServer.dateTo.valueOf()) {
            alert('"Date from" is after "Date to": please check!')
        }
        //this.reportService.getExceedingMessages(this.modelSentToServer).toPromise().then((message) => {
        this.reportService.getExceedingMessagesMock(this.modelSentToServer).then((message) => {
            if (message && message === 'OK') {
                this.angularBlobService.download(this.modelSentToServer);
            }
            else {
                //this.messageToDialog = 'Excel too large: ' + message
                //this.showDialog = true
                this.messageToDialog.emit('Excel too large: ' + message)
                //this.dialogModalService.open('excel is toto large')
                //  alert('Excel too large: ' + message)
            }

        });

    }


    ngOnInit(): void {
        this.getMachineInvoke()
        this.getErrorsInvoke()
        this.yearsList = YEARS
        this.monthsList = MONTHS
        this.monthDaysList = MONTHDAYS
        this.weekDaysList = WEEKDAYS
        this.hoursList = HOURS
        this.showDialog = false
    }


    groupByDayChange(groupByDay): any {
        groupByDay = !groupByDay
        this.model.groupByDay = !this.model.groupByDay
        this.showMessagesFilters = !this.showMessagesFilters
    }

    // machines
    getMachineInvoke(): void {
        this.getMachinesMock();
        //this.getMachines();
    }

    getMachinesMock(): void {
        this.machineList = MACHINE_NICE;
    }

    getMachines(): void {
        this.machineService.getMachines()
            .subscribe(
            machines => this.machineList = machines,
            error => this.errorMessage = <any>error)
    }


    // errors
    getErrorsInvoke(): void {
        //this.getErrorsMock();
        this.getErrors();
    }

    getErrorsMock(): void {
        this.errorList = ERRORS_NICE;
    }

    getErrors(): void {
        this.errorService.getErrorMaps()
            .subscribe(
            errorsFromBackend => this.errorList = errorsFromBackend,
            error => this.errorMessage = <any>error)
    }



}