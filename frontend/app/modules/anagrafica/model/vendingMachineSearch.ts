import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
export class VendingMachineSearch {
    dateFrom: Date;
    dateTo: Date;
    groupByDay: Boolean;
    machineIds: IMultiSelectOption[];
    status: IMultiSelectOption[];
    monthDays: IMultiSelectOption[];
    months: IMultiSelectOption[];
    years: IMultiSelectOption[];
    weekDays: IMultiSelectOption[];
    hours: IMultiSelectOption[];
}