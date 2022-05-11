import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatTabsModule, MatTooltipModule, MatButtonModule, MatMenuModule, MatSelectModule, MatInputModule, MatCardModule, MatRippleModule, MatDividerModule, MatRadioModule, MatProgressBarModule, MatListModule } from '@angular/material';
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
import { FormatFieldDialogComponent } from './components/input-definition/dialog/format-field-dialog/format-field-dialog.component';
import { NewFieldDialogComponent } from './components/input-definition/dialog/new-field-dialog/new-field-dialog.component';
import { PossibleValueDialogComponent } from './components/field-format/dialog/possible-value-dialog/possible-value-dialog.component';
import { ConvertFileResolver } from './resolvers/general-parameter/convert-file.resolver';
import { DataTypeResolver } from './resolvers/general-parameter/data-type.resolver';
import { LineSeparatorsResolver } from './resolvers/general-parameter/line-separators.resolver';
import { MaxRecordsResolver } from './resolvers/general-parameter/max-records.resolver';
import { SeparatorsResolver } from './resolvers/general-parameter/separators.resolver';
import { InternalEquivalenceResolver } from './resolvers/definition/internal-equivalence.resolver';
import { GeneralFieldsFormComponent } from './components/input-definition/form/general-fields-form/general-fields-form.component';



@NgModule({
  declarations: [InputConfigurationDetailComponent, InputConfigurationComponent, FieldFormatComponent, InputDefinitionComponent, ResumeComponent, TestInputComponent, InputStructDialogComponent, ExtractFieldDialogComponent, FormatFieldDialogComponent, NewFieldDialogComponent, PossibleValueDialogComponent, GeneralFieldsFormComponent],
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
    MatProgressBarModule,
    MatListModule
  ],
  entryComponents: [
    InputStructDialogComponent,
    ExtractFieldDialogComponent,
    NewFieldDialogComponent,
    FormatFieldDialogComponent,
    PossibleValueDialogComponent
  ],
  providers: [
    { provide: DirtyGuard, useClass: DirtyGuard },
    InputStructDialogComponent,
    ExtractFieldDialogComponent,
    NewFieldDialogComponent,
    FormatFieldDialogComponent,
    PossibleValueDialogComponent,
    DataTypeResolver,
    MaxRecordsResolver,
    LineSeparatorsResolver,
    InternalEquivalenceResolver,
    SeparatorsResolver,
    ConvertFileResolver
  ]
})
export class InputConfigurationModule { }
