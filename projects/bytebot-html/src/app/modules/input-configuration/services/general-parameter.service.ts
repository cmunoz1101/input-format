import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneralParameterService {

    private serviceURL = './service/input-configuration/general-parameter';

    constructor(
        private httpClient: HttpClient
    ) { }

    getValueByKey(key: string) {
        return this.httpClient.get(`${this.serviceURL}/${key}`);
    }

}