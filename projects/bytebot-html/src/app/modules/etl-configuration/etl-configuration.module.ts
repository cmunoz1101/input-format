import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatPaginatorModule, MatRadioModule, MatSelect, MatSelectModule, MatSlideToggleModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XdfCommonsModule } from '@xdf/commons';
import { XdfGalleryModule } from '@xdf/gallery';
import { TranslateModule } from '@ngx-translate/core';
import { EtlConfigurationRoutingModule } from './etl-configuration-routing.module';
import { XdfLayoutsModule } from '@xdf/layouts';
import { EtlConfigurationGridComponent } from './views/etl-configuration-grid/etl-configuration-grid.component';
import { EtlConfigurationDetailComponent } from './views/etl-configuration-detail/etl-configuration-detail.component';
import { EcFieldFormatComponent } from './views/components/ec-field-format/ec-field-format.component';
import { EcSourceDefinitionComponent } from './views/components/ec-source-definition/ec-source-definition.component';
import { EcSourceTestComponent } from './views/components/ec-source-test/ec-source-test.component';
import { EcSummaryComponent } from './views/components/ec-summary/ec-summary.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropListComponent } from './views/components/ec-source-definition/components/drag-drop-list/drag-drop-list.component';
import { SourcePreviewGridComponent } from './views/components/ec-source-definition/components/source-preview-grid/source-preview-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FieldsListComponent } from './views/components/ec-field-format/components/fields-list/fields-list.component';
import { FieldsFormComponent } from './views/components/ec-field-format/components/fields-form/fields-form.component';
import { FieldsFormatDialogComponent } from './views/components/ec-field-format/components/fields-format-dialog/fields-format-dialog.component';
import { FieldsFormatDialogService } from './views/components/ec-field-format/components/fields-format-dialog/services/fields-format-dialog.service';
import { DraftTooltipComponent } from './views/etl-configuration-grid/components/draft-tooltip/draft-tooltip.component';
import { ToolTipDirective } from './views/etl-configuration-grid/components/draft-tooltip/tooltip-host.directive';
import { ActivateDraftPopupComponent } from './views/etl-configuration-grid/components/activate-draft-popup/activate-draft-popup.component';
import { ActivateDraftPopupService } from './views/etl-configuration-grid/services/activate-draft-popup.service';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [ ToolTipDirective,EtlConfigurationGridComponent, EtlConfigurationDetailComponent, EcSourceDefinitionComponent, EcFieldFormatComponent, EcSourceTestComponent, EcSummaryComponent, DragDropListComponent, SourcePreviewGridComponent, FieldsListComponent, FieldsFormComponent, FieldsFormatDialogComponent, DraftTooltipComponent, ActivateDraftPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    XdfLayoutsModule,
    XdfCommonsModule,
    XdfGalleryModule,
    TranslateModule,
    DragDropModule,
    AgGridModule.withComponents([]),
    MatDatepickerModule,
    MatButtonToggleModule,
    EtlConfigurationRoutingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatOptionModule,
    MatTooltipModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDialogModule
  ],entryComponents: [
    FieldsFormatDialogComponent,
    ActivateDraftPopupComponent,
    DraftTooltipComponent
  ],providers: [FieldsFormatDialogService, ActivateDraftPopupService]
})
export class EtlConfigurationModule { }
