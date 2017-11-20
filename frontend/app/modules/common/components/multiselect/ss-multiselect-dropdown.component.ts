import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { MachineService } from './../../service/machine.service';

@Component({
    selector: 'multiselect',
    templateUrl: 'ss-multiselect-dropdown.component.html',
    styleUrls: ['ss-multiselect-dropdown.component.css'],
    providers: [  MachineService ]
})

export class MultiSelectComponent implements OnInit {

    @Input()
    dropdownList: IMultiSelectOption[];

    optionsSelected : IMultiSelectOption[];
    myOptions: IMultiSelectOption[];
    
    mySettings: IMultiSelectSettings = {
        enableSearch: false,
        dynamicTitleMaxItems: 3,
        showCheckAll: true,
        showUncheckAll: true,
        displayAllSelectedText: true,
        buttonClasses: 'btn btn-primary btn-secondary width-button-ss'
    };


    myTexts: IMultiSelectTexts

    @Output()
    selectedOptions: EventEmitter<IMultiSelectOption[]> = new EventEmitter<IMultiSelectOption[]>();


    ngOnInit(): void {
        this.myOptions = this.dropdownList;
       this.myTexts= {
            checkAll: 'Select all',
            uncheckAll: 'Unselect all',
            //searchPlaceholder: 'Find',
            searchEmptyResult: 'Nothing found...',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Select',
            allSelected: 'All selected',
        };
    }

    onChange(){
        this.selectedOptions.emit(this.optionsSelected)
    }
}