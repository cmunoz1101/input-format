import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import * as source from '../../assets/fake-data/programs-data.json';
import * as controlsSource from '../../assets/fake-data/controls-data.json';

const basePath = '/service/security/programs';
const basePathCotnrols = '/service/security/controls';

@Injectable()
export class CustomProgramsFakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const data = (source as any).default;
        const dataControls = (controlsSource as any).default;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(50))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.match('.*' + basePath) && method === 'GET':
                    return getList();

                case url.match('.*' + basePathCotnrols + '.*') && method === 'GET':
                    return getControls();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function getList() {
            return ok(data);
        }

        function getControls() {
            return ok(dataControls);
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
