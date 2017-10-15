

import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitService {

    myEvent: EventEmitter<any>;
    constructor() {
        this.myEvent = new EventEmitter();
    }

}