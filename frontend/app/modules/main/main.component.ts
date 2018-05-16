import { Component, OnInit } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {

    constructor(private router: Router) {}

    goToAnagrafica(): void {
        this.router.navigate(['/vending-machine']);
    }
}