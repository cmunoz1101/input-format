import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DefinitionService {

    private internalEquivalenceURL = 'assets/definitions/input-configuration/internal-equivalence.json';

    constructor(
        private httpClient: HttpClient
    ) { }

    getinternalEquivalence(): Observable<any> {
        return this.httpClient.get(this.internalEquivalenceURL);
    }

}