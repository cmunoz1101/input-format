import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService, ApplicationSettings } from '@xdf/layouts';

@Injectable({
    providedIn: 'root'
})
export class BytebotSettingsService extends SettingsService {

    constructor(private http: HttpClient) {
        super();
    }

    getApplicationSettings(): Observable<ApplicationSettings> {
        return this.http.get<ApplicationSettings>('./service/settings-logo/');
    }

}
