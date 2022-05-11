import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputFieldPossibleValue } from '../models/input-field-possible-value';
import { GenericService } from './input-generic.service';

@Injectable({
    providedIn: 'root'
})
export class InputFieldPossibleValueService extends GenericService<InputFieldPossibleValue> {

    private serviceURL = './service/input-configuration/possible-value';

    constructor(
        protected httpClient: HttpClient,
    ) {
        super(
            httpClient,
            './service/input-configuration/possible-value'
        );
    }

    listByFieldId(fieldId: number) {
        return this.httpClient.get<InputFieldPossibleValue[]>(`${this.serviceURL}/${fieldId}`);
    }

}