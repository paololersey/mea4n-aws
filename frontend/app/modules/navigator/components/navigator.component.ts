import { Component } from "@angular/core";
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'navigator',
    templateUrl: 'navigator.component.html',
    styleUrls: ['./navigator.component.css'],
    providers: [NgbAccordionConfig] // add the NgbAccordionConfig to the component providers
})
export class NavigatorComponent {
    //constructor(config: NgbAccordionConfig) {
        // customize default values of accordions used by this component tree
     //   config.closeOthers = true;
        //config.type = 'info';
   // }

}