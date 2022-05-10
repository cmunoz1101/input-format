import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedFilterService {
    private myStartDate: Date;
    private myEndDate: Date;

    get startDate(): Date {
        return this.myStartDate;
    }

    get endDate(): Date {
        return this.myEndDate;
    }

    setStartDate(date: Date) {
        this.myStartDate = date;
    }

    setEndDate(date: Date) {
        this.myEndDate = date;
    }

}
