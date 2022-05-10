import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import * as source from '../../assets/fake-data/operative-dashboard-data.json';

const basePath = '/test';

@Injectable()
export class OperativeDashboardFakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const data = (source as any).default;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(50))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.match('.*' + basePath) && method === 'POST':
                    return getData();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function getData() {
            return ok(data);
        }

        // helper functions

        function ok(bodyContent?) {
            return of(new HttpResponse({ status: 200, body: bodyContent }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

    }
}
