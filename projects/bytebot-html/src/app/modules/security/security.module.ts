import { NgModule } from '@angular/core';
import { DirtyGuard, XdfGalleryModule } from '@xdf/gallery';

import { SecurityRoutingModule } from './security-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { XdfSettingsModule } from '@xdf/settings';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    XdfGalleryModule,
    XdfSettingsModule,
    SecurityRoutingModule
  ],
  entryComponents: [
  ],
  providers: [
    { provide: DirtyGuard, useClass: DirtyGuard }
  ]
})
export class SecurityModule { }
