import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { SortField, DIRECTION } from '@xdf/commons';


const basePath = '/service/agent';

const tableData: Array<any> = [
    {
        id: 361,
        name: 'BANCO DE CREDITO DEL PERU',
        version: '0.0.1',
        status: 'Activo',
        country: 'Perú',
        timezone: 'GMT-5',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
        id: 362,
        name: 'BANCO CONTINENTAL',
        version: '0.0.5',
        status: 'Activo',
        country: 'Perú',
        timezone: 'GMT-5',
        avatar: 'https://lh3.googleusercontent.com/VHB9bVB8cTcnqwnu0nJqKYbiutRclnbGxTpwnayKB4vMxZj8pk1220Rg-6oQ68DwAkqO=s180-rw'
    },
    {
        id: 363,
        name: 'JUAN DE ARONA',
        version: '0.0.1',
        status: 'Activo',
        country: 'Perú',
        timezone: 'GMT-5',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
        id: 364,
        name: 'JUAN DE ARONA 2',
        version: '0.0.1',
        status: 'Activo',
        country: 'Perú',
        timezone: 'GMT-5',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    }
];

const data: Array<any> = [
    {
        id: 361,
        name: 'BANCO DE CREDITO DEL PERU',
        version: '0.0.1',
        status: 'Activo',
        country: 'Perú',
        timezone: 'GMT-5',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    }
];

const countries: Array<any> = [
    {
        id: 1,
        name: 'Perú',
        timezones: [
            'GMT-5'
        ]
    },
    {
        id: 2,
        name: 'Argentina',
        timezones: [
            'GMT-3'
        ]
    },
    {
        id: 3,
        name: 'Brazil',
        timezones: [
            'GMT-5',
            'GMT-4',
            'GMT-3',
            'GMT-2'
        ]
    }
];

const fakeAgentData = {
    id: 361,
    name: 'BANCO DE CREDITO DEL PERU',
    description: 'El mejor banco que te roba la plata con intereses',
    version: '0.0.1',
    status: 'Activo',
    countryId: 1,
    timezone: 'GMT-5',
    avatar: '',
    frequentQuestions: [
        {
            id: 1,
            filename: 'questions-opt.xlsx',
            description: 'primer archivo',
            status: 'PS',
            user: '',
            uploadDate: ''
        },
        {
            id: 2,
            filename: 'questions-training.xlsx',
            description: 'segundo archivo',
            status: 'PS',
            user: '',
            uploadDate: ''
        },
        {
            id: 3,
            filename: 'questions-brainstorming.xlsx',
            description: 'tercero archivo',
            status: 'PS',
            user: '',
            uploadDate: ''
        },
        {
            id: 4,
            filename: 'questions-onu.xlsx',
            description: 'cuarto archivo',
            status: 'PS',
            user: '',
            uploadDate: ''
        },
        {
            id: 5,
            filename: 'questions-byte.xlsx',
            description: 'quinto archivo',
            status: 'PS',
            user: '',
            uploadDate: ''
        }
    ]
};

const fakeAgentData2 = {
    id: 361,
    name: 'BANCO DE CREDITO DEL PERU',
    description: 'El mejor banco que te roba la plata con intereses',
    version: '0.0.1',
    status: 'Activo',
    countryId: 1,
    timezone: 'GMT-5',
    avatar: '',
    frequentQuestions: []
};

const channels = [
    {
        id: 101,
        name: 'Facebook Messenger',
        image: 'https://img.icons8.com/color/452/facebook-messenger.png',
        parameters: [
            {
                name: 'webhook',
                label: 'webhook',
                maxlength: 200,
                type: 'text',
                required: true,
                traductions: { es: 'URL de devolución de llamada', en: 'Webhook' }
            },
            {
                name: 'verification-token',
                label: 'verification-token',
                maxlength: 80,
                type: 'text',
                required: true,
                traductions: { es: 'Token de verificación', en: 'Verification token' }
            },
            {
                name: 'access-token',
                label: 'access-token',
                maxlength: 80,
                type: 'text',
                required: true,
                traductions: { es: 'Token de acceso', en: 'Access token' }
            }
        ]
    },
    {
        id: 103,
        name: 'WhatsApp',
        image: 'https://img.icons8.com/color/452/whatsapp.png',
        parameters: [
            {
                name: 'account-identifier',
                label: 'account-identifier',
                maxlength: 80,
                type: 'text',
                required: true,
                traductions: { es: 'Identificador de cuenta', en: 'Account identifier' }
            },
            {
                name: 'authentication-token',
                label: 'authentication-token',
                maxlength: 80,
                type: 'text',
                required: true,
                traductions: { es: 'Token de autenticación', en: 'Authentication token' }
            },
            {
                name: 'twillio-number',
                label: 'twillio-number',
                type: 'number',
                required: true,
                traductions: { es: 'Número de Twillio', en: 'Twillio number' }
            }
        ]
    }
];

const fileOK = {
    uuid: '6850b631-5cb1-4614-8f0e-e43441d7bd35',
    id: 100,
    fileName: 'vacaciones-preguntas.xls',
    description: 'Preguntas Vacaciones',
    status: 'PS',
    user: '',
    uploadDate: ''
};

@Injectable()
export class AgentFakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(10))
            .pipe(dematerialize());

        function handleRoute() {

            switch (true) {
                // case url.endsWith(basePath + '/page') && method === 'POST':
                //     return pagination(body);
                // case url.indexOf(basePath + '/connection/data') !== -1 && method === 'GET ':
                //     return ok({});
                // case url.indexOf(basePath + '/countries') !== -1 && method === 'GET':
                //     return ok(countries);
                // case url.indexOf(basePath + '/channels') !== -1 && method === 'GET':
                //     return ok(channels);
                // case url.indexOf(basePath + '/file-upload') !== -1 && method === 'POST':
                //     return ok(fileOK);
                // case url.indexOf(basePath + '/') !== -1 && method === 'GET':
                //     return ok(fakeAgentData);
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function pagination(dataRecibida: any) {
            dataRecibida.totalItems = tableData.length;

            const pageNumber = dataRecibida.currentPage;
            const pageSize = dataRecibida.itemsPerPage ? dataRecibida.itemsPerPage : 5;

            dataRecibida.totalPages = Math.ceil(dataRecibida.totalItems / pageSize);

            if (dataRecibida.sortFields.length > 0) {
                const sortField: any = dataRecibida.sortFields[0];
                if (sortField.direction === DIRECTION.asc) {
                    tableData.sort((a, b) => {
                        if (JSON.stringify(a[sortField.field]) > JSON.stringify(b[sortField.field])) {
                            return 1;
                        } else if (JSON.stringify(a[sortField.field]) < JSON.stringify(b[sortField.field])) {
                            return -1;
                        }
                        return 0;
                    });
                } else {
                    tableData.sort((a, b) => {
                        if (JSON.stringify(a[sortField.field]) < JSON.stringify(b[sortField.field])) {
                            return 1;
                        } else if (JSON.stringify(a[sortField.field]) > JSON.stringify(b[sortField.field])) {
                            return -1;
                        }
                        return 0;
                    });
                }
            }

            dataRecibida.data = tableData.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

            return ok(dataRecibida);
        }


        function ok(bodyContent?: any) {
            return of(new HttpResponse({ status: 200, body: bodyContent }));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }


    }
}
