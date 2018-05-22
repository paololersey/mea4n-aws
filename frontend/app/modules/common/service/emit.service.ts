

import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class EmitService {

    public flagSearch: EventEmitter<Boolean>;

    constructor() {
        this.flagSearch = new EventEmitter();
    }

    public startSearch(boo: Boolean ): void {
        this.flagSearch.emit(boo);
    }
}