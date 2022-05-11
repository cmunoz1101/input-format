import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { DIRECTION, SortField } from "@xdf/commons";
  import { Observable, of } from "rxjs";
  import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";
  
  const basePath = "/service/etl_configuration";
  const data = [
    {
      id: 1,
      description: "Aumentar los incentivos para la venta de servicios de cable y telefonía",
      startDate: new Date(2020,11,21).toISOString(),
      endDate: new Date(2020,11,21).toISOString(),
      status: "V",
      validation: "V",
      draftId: "2",
    },{
      id: 2,
      description: "Venta de equipo de nivel medio y alto",
      startDate: new Date(2020,11,21).toISOString(),
      endDate: new Date(2020,11,21).toISOString(),
      status: "C",
    }
  ];
  
  @Injectable()
  export class EtlConfigurationFakeBackend implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const { url, method, body } = req;
  
      return of(null)
        .pipe(mergeMap(handleRequest))
        .pipe(materialize())
        .pipe(delay(50))
        .pipe(dematerialize());
  
      function handleRequest() {
        if (url.endsWith(basePath + "/page") && method === "POST") {
          return pagination(body);
        }else if(url.endsWith(basePath + "/all")&& method === "GET"){
          return getAll();
        } else if (url.match(".*" + basePath + "/" + "[0-9]+")) {
          switch (method) {
            case "GET":
              return getOneItem();
            case "DELETE":
              return deleteItem();
            default:
              return next.handle(req);
          }
        } 
        return next.handle(req);
      }
  
      function pagination(body) {
        body.totalPages = 1;
        body.totalItems = 2;
  
        const page_number = body.currentPage;
        const page_size = body.itemsPerPage ? body.itemsPerPage : 5;
  
        if (body.sortFields.length > 0) {
          const sortField: SortField = body.sortFields[0];
          const sign = sortField.direction === DIRECTION.asc ? 1 : -1;
          data.sort(function (a, b) {
            if (
              typeof a[sortField.field] === "number" &&
              typeof b[sortField.field] === "number"
            ) {
              if (a[sortField.field] > b[sortField.field]) {
                return 1 * sign;
              } else if (a[sortField.field] < b[sortField.field]) {
                return -1 * sign;
              }
              return 0;
            } else {
              return a[sortField.field].localCompare(b[sortField.field]) * sign;
            }
          });
        }
        body.data = data.slice(
          page_number * page_size,
          (page_number + 1) * page_size
        );
        body.data = data;
        return of(new HttpResponse({ status: 200, body: body }));
      }
  
      function getOneItem() {
        const id = <number>(url.substring(url.lastIndexOf("/") + 1) as any);
        const item = (<Array<any>>data).filter((item) => item.id == id)[0];
        return of(new HttpResponse({ status: 200, body: item }));
      }
  
      function deleteItem() {
        const id = <number>(url.substring(url.lastIndexOf("/") + 1) as any);
        let newData = (<Array<any>>data).filter((item) => item.id != id);
        return of(new HttpResponse({ status: 200, body: [] }));
      }

      function getAll(){
        return of(new HttpResponse({ status: 200, body: data }));
      }
  

    }
  }
  