import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pagination } from "@xdf/commons";
import { DynaDataService } from "@xdf/gallery";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


const servicePath = "./service/etl_configuration"
@Injectable({
    providedIn: 'root'
})
export class EtlGridService extends DynaDataService {
    constructor(private httpClient: HttpClient) {
        super(httpClient);
      }
      create(data: any): Observable<object> {
        return this.httpClient.post(servicePath + "/", data).pipe(
          map((data) => {
            return data;
          })
        );
      }
    
      getResultPagination(pagination: Pagination): Observable<Pagination> {
        return this.httpClient.post(servicePath + "/page", pagination).pipe(
          map((data) => {
            return this.getPage(data as Pagination);
          })
        );
      }
    
      getResult(id: any): Observable<object> {
        return this.httpClient.get(servicePath + "/" + id).pipe(
          map((data) => {
            return data;
          })
        );
      }


}