import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'datepicker-popup',
    templateUrl: './datepicker-popup.html'
})
export class DatepickerPopupComponent {
    @Input()
    model: any;
    @Input()
    id: string;
    @Input()
    required: boolean = false;
    @Output()
    modelChange: EventEmitter<any> = new EventEmitter();

    dateStruct: any;

    constructor() { }
    updateModel() {
        this.modelChange.emit(this.model);
    }

    ngOnChanges() {
        this.updateModel();
    }
    ngOnDestroy() {
        this.updateModel();
    }
    transformDate(dateStruct: any): Date {
        return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    }

}