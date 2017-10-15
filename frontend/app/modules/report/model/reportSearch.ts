import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
export class ReportSearch {
    dateFrom: Date;
    dateTo: Date;
    groupByDay: Boolean;
    machineIds: IMultiSelectOption[];
    errors: IMultiSelectOption[];
    monthDays: IMultiSelectOption[];
    months: IMultiSelectOption[];
    years: IMultiSelectOption[];
    weekDays: IMultiSelectOption[];
    hours: IMultiSelectOption[];
}