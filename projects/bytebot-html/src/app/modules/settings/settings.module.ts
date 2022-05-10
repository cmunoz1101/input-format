import { NgModule } from '@angular/core';
import { DirtyGuard, XdfGalleryModule, EditableDataTableTemplateResolver } from '@xdf/gallery';
import { SettingsRoutingModule } from './settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatSelectModule, MatTooltipModule, MatButtonModule } from '@angular/material';
import { XdfSettingsModule } from '@xdf/settings';
import { XdfLayoutsModule } from '@xdf/layouts';

@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SettingsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    XdfGalleryModule,
    XdfSettingsModule,
    XdfLayoutsModule,
    MatButtonModule
  ],
  entryComponents: [
  ],
  providers: [
    { provide: DirtyGuard, useClass: DirtyGuard },
    EditableDataTableTemplateResolver
  ]
})
export class SettingsModule { }
