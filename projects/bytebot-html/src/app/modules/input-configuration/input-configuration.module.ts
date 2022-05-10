import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatTabsModule, MatTooltipModule, MatButtonModule, MatMenuModule, MatSelectModule, MatInputModule, MatCardModule, MatRippleModule, MatDividerModule, MatRadioModule, MatProgressBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DirtyGuard, XdfGalleryModule } from '@xdf/gallery';
import { XdfLayoutsModule } from '@xdf/layouts';
import { XdfSettingsModule } from '@xdf/settings';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { InputConfigurationRoutingModule } from './input-configuration-routing.module';
import { InputConfigurationDetailComponent } from './input-configuration-detail/input-configuration-detail.component';
import { InputConfigurationComponent } from './input-configuration/input-configuration.component';
import { FieldFormatComponent } from './components/field-format/field-format.component';
import { InputDefinitionComponent } from './components/input-definition/input-definition.component';
import { ResumeComponent } from './components/resume/resume.component';
import { TestInputComponent } from './components/test-input/test-input.component';
import { InputStructDialogComponent } from './components/input-definition/dialog/input-struct-dialog/input-struct-dialog.component';
import { ExtractFieldDialogComponent } from './components/input-definition/dialog/extract-field-dialog/extract-field-dialog.component';



@NgModule({
  declarations: [InputConfigurationDetailComponent, InputConfigurationComponent, FieldFormatComponent, InputDefinitionComponent, ResumeComponent, TestInputComponent, InputStructDialogComponent, ExtractFieldDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TranslateModule,
    XdfGalleryModule,
    XdfSettingsModule,
    InputConfigurationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    NgScrollbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    XdfLayoutsModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatDividerModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: DirtyGuard, useClass: DirtyGuard }
  ]
})
export class InputConfigurationModule { }
