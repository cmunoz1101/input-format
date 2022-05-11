import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

// XDF
import { XdfLayoutsModule, SettingsService, ByteSettingsService, SettingsFakeBackendInterceptor } from '@xdf/layouts';
import { XdfSecurityModule, ByteAuthenticationService, AuthGuard, OAuthGuard, OAuthAuthenticationService } from '@xdf/security';
import { ResourceAuthGuard, AuthenticationFakeBackendInterceptor, ProgramsFakeBackendInterceptor } from '@xdf/security';
import { XdfCommonsModule, NotificationService, ToastNotificationService, AuthenticationService } from '@xdf/commons';
import { INITSERVICE_OPTIONS, InitCommonsService, ErrorsHandler } from '@xdf/commons';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ToastrModule } from 'ngx-toastr';

import localeEs from '@angular/common/locales/es-PE';
import localeEn from '@angular/common/locales/en';
import { MAT_DATE_LOCALE, MatDialog, MatButtonModule, MatDialogModule, MatPaginatorIntl, DateAdapter } from '@angular/material';
import { MAT_DATE_FORMATS, MatIconModule } from '@angular/material';
import { XdfGalleryModule, CustomMatPaginatorIntl, DATERANGEPICKER_LOCALE, DaterangepickerLocaleService } from '@xdf/gallery';
import { ConflictErrorDialogService, HttpErrorHandleInterceptor } from '@xdf/gallery';

import { BytebotSettingsService } from './services/bytebot-settings-service';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';



import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { CustomProgramsFakeBackendInterceptor } from './interceptors/custom-programs-fake-backend.interceptor';
import { AgentFakeBackendInterceptor } from './interceptors/agent-fake-backend.interceptor';
import { OperativeDashboardFakeBackendInterceptor } from './interceptors/operative-dashboard-fake-backend.interceptor';
import { CustomErrorHandlerInterceptor } from './interceptors/custom-error-handler.interceptor';
import { EtlConfigurationFakeBackend } from './interceptors/etl-configuration-fake-backend.interceptor';

const INITIAL_LANGUAGE = 'es';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http,
    [
      { prefix: './assets/i18n/', suffix: '.json' },
      { prefix: './assets/i18n/menu/', suffix: '.json' },
      { prefix: './assets/i18n/layouts/', suffix: '.json' },
      { prefix: './assets/i18n/gallery/', suffix: '.json' },
      { prefix: './assets/i18n/security/', suffix: '.json' },
      { prefix: './assets/i18n/settings/', suffix: '.json' },
      { prefix: './assets/i18n/etl-configuration/', suffix: '.json' }
      
    ]);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    XdfCommonsModule.forRoot({
      language: INITIAL_LANGUAGE
    }),
    XdfLayoutsModule,
    XdfSecurityModule,
    XdfGalleryModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: INITIAL_LANGUAGE },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl, deps: [TranslateService] },
    { provide: DATERANGEPICKER_LOCALE, useValue: INITIAL_LANGUAGE },
    { provide: DaterangepickerLocaleService, useClass: DaterangepickerLocaleService },

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NotificationService, useClass: ToastNotificationService },
    { provide: SettingsService, useClass: ByteSettingsService },

    ConflictErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorsHandler, multi: true},

    { provide: ResourceAuthGuard, useClass: ResourceAuthGuard },

    // descomentar estas lineas para OAUTH
    //{ provide: AuthGuard, useClass: OAuthGuard },
    //{ provide: AuthenticationService, useClass: OAuthAuthenticationService },
    //{ provide: APP_INITIALIZER, useFactory: loginLoaderFactory, deps: [AuthenticationService], multi: true },

    // Para probar mantenimientos

    // comentar estas lineas para OAUTH
    { provide: AuthGuard, useClass: AuthGuard},
    { provide: AuthenticationService, useClass: ByteAuthenticationService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationFakeBackendInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: SettingsFakeBackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomProgramsFakeBackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AgentFakeBackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EtlConfigurationFakeBackend, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OperativeDashboardFakeBackendInterceptor, multi: true },


    { provide: APP_INITIALIZER, useFactory: init_app, deps: [InitCommonsService, TranslateService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init_app(appLoaderService: InitCommonsService) {
  return () => appLoaderService.initializeApp();
}

// required for AOT compilation
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

// Para OAUTH
export function loginLoaderFactory(provider: OAuthAuthenticationService) {
  return () => provider.login(null, null).toPromise();
}
