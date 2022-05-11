import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { DIRECTION, SortField } from '@xdf/commons';

import * as dataTypeSource from '../../assets/fake-data/input-configuration/general-parameters/data-type.json';
import * as maxRecordsSource from '../../assets/fake-data/input-configuration/general-parameters/max-records.json';
import * as lineSeparatorsSource from '../../assets/fake-data/input-configuration/general-parameters/line-separators.json';
import * as separatorsSource from '../../assets/fake-data/input-configuration/general-parameters/separators.json';
import * as convertFileSource from '../../assets/fake-data/input-configuration/general-parameters/convert-file.json';
import * as possibleValueSource from '../../assets/fake-data/input-configuration/models/possible-value.json';

const definitionInputPath = '/service/input-configuration';

@Injectable()
export class InputConfigurationFakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;

        const dataTypeData = (dataTypeSource as any).default;
        const maxRecordsData = (maxRecordsSource as any).default;
        const lineSeparatorsData = (lineSeparatorsSource as any).default;
        const separatorsData = (separatorsSource as any).default;
        const convertFileData = (convertFileSource as any).default;
        const possibleValueData = (possibleValueSource as any).default;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(50))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {

                case url.endsWith(definitionInputPath + '/') && method === 'POST':
                    return ok();
                case url.endsWith(definitionInputPath + '/possible-value/1') && method === 'GET':
                    return ok(possibleValueData);
                case url.endsWith(definitionInputPath + '/general-parameters/input-configuration-data-type') && method === 'GET':
                    return ok(dataTypeData);
                case url.endsWith(definitionInputPath + '/general-parameters/input-configuration-max-records') && method === 'GET':
                    return ok(maxRecordsData);
                case url.endsWith(definitionInputPath + '/general-parameters/input-configuration-line-separators') && method === 'GET':
                    return ok(lineSeparatorsData);
                case url.endsWith(definitionInputPath + '/general-parameters/input-configuration-separators') && method === 'GET':
                    return ok(separatorsData);
                case url.endsWith(definitionInputPath + '/general-parameters/input-configuration-convert-file') && method === 'GET':
                    return ok(convertFileData);
                case url.match('.*' + definitionInputPath + '/\\d+$') && method === 'DELETE':
                    return deleteOperation(url, 'passengers');
                case url.match('.*' + definitionInputPath + '/\\d+$') && method === 'PUT':
                    return ok();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }
        function pagination(body, data) {
            body.totalPages = 1;
            body.totalItems = 2;

            console.log('body and data');
            console.log(body);
            console.log(data);

            const page_number = body.currentPage;
            const page_size = body.itemsPerPage ? body.itemsPerPage : 5;

            if (body.sortFields.length > 0) {
                const sortField: SortField = body.sortFields[0];
                const sign = sortField.direction === DIRECTION.asc ? 1 : -1;
                data.sort(function (a, b) {
                    if ((typeof a[sortField.field] === 'number') && (typeof b[sortField.field] === 'number')) {
                        if (a[sortField.field] > b[sortField.field]) {
                            return 1 * sign;
                        } else if (a[sortField.field] < b[sortField.field]) {
                            return -1 * sign;
                        }
                        return 0;
                    } else {
                        return a[sortField.field].localeCompare(b[sortField.field]) * sign;
                    }
                });
            }

            body.data = data.slice(page_number * page_size, (page_number + 1) * page_size);
            return ok(body);
        }
        function getOne(url, data) {
            const n = url.lastIndexOf("/") + 1;
            const id: Number = Number(url.substring(n));
            return ok(data.filter(x => x.id === id)[0]);
        }
        function deleteOperation(url, name) {
            const n = url.lastIndexOf("/") + 1;
            const id: Number = Number(url.substring(n));
            switch (name) {
                //case 'passengers':
                //    (passengersSource as any).default = passengersData.filter(item => item.id !== id);
                //    break;
            }
            return ok();
        }

        function ok(bodyContent?) {
            return of(new HttpResponse({ status: 200, body: bodyContent }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

    }
}
