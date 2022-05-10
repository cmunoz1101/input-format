import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';

import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, NotificationType, AuthenticationService } from '@xdf/commons';
import { Router } from '@angular/router';
import { ConflictErrorDialogService } from '@xdf/gallery';

@Injectable()
export class CustomErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private conflictErrorDialogService: ConflictErrorDialogService) {
  }

  intercept(
    req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            const message = this.translate.instant('message.error.unauthorized');
            this.notificationService.showMessage(message, this.translate.instant('title.error'), NotificationType.error);
            break;
          case 404:
            const messageError = error.error ? error.error : error.message;
            this.notificationService.showMessage(messageError, this.translate.instant('title.error'), NotificationType.error);
            break;
          case 409:
            const messageDuplicate = this.translate.instant('message.error.duplicated');
            this.notificationService.showMessage(messageDuplicate, this.translate.instant('title.error'), NotificationType.error);
            break;
          case 419: // validar cual es el código correcto
            this.conflictErrorDialogService.loadComponent(
                null,
                'title.error.conflict',
                'message.error.conflict',
                error.error);
            break;
          default:
          if (error.status === 0) {
            this.authenticationService.login(null, null).subscribe(
              data => {
                window.location.href = './';
              });
          } else {
            let messageDefault = '';
            if (error.error) {
              if (error.error.params) {
                const params = [];
                error.error.params.forEach(element => {
                  params.push(this.translate.instant(element));
                });
                messageDefault = this.translate.instant(error.error.message, params);
              } else {
                if (error.error.message) {
                  messageDefault = this.translate.instant(error.error.message);
                } else {
                  messageDefault = this.translate.instant(error.error);
                }
              }
            } else {
              messageDefault = this.translate.instant(error.message);
            }
            this.notificationService.showMessage(messageDefault, this.translate.instant('title.error'), NotificationType.error);
          }
        }

        return throwError(error);
      })
    );
  }
}
