import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericService<T> {

    constructor(
        protected httpClient: HttpClient,
        protected url: string
    ) { }

    list() {
        return this.httpClient.get<T[]>(this.url);
    }

    listById(id: number) {
        return this.httpClient.get<T>(`${this.url}/${id}`);
    }

    register(t: T) {
        return this.httpClient.post(this.url, t);
    }

    modify(t: T) {
        return this.httpClient.put(this.url, t);
    }

    delete(id: number) {
        return this.httpClient.delete(`${this.url}/${id}`);
    }
}
