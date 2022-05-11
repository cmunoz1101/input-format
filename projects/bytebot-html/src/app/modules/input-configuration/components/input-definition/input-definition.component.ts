import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { InputStructDialogComponent } from './dialog/input-struct-dialog/input-struct-dialog.component';

@Component({
  selector: 'byte-input-definition',
  templateUrl: './input-definition.component.html',
  styleUrls: ['./input-definition.component.scss']
})
export class InputDefinitionComponent implements OnInit {

  inputStructDialogRef: MatDialogRef<InputStructDialogComponent>;
  maxRecords: any;
  lineSeparators: any;
  mode: string;

  constructor(
    private matDialog: MatDialog,
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Carga máximo de registros:
    this.maxRecords = this.route.snapshot.data['maxRecordsResolver'];
    // Carga separadores de línea:
    this.lineSeparators = this.route.snapshot.data['lineSeparatorsResolver'];
    // Carga tipos de dato:
    //this.dataTypeList = this.route.snapshot.data['dataTypeResolver'];
  }

  openDialogInputStruct() {
    this.inputStructDialogRef = this.matDialog.open(InputStructDialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        title: 'label.strategy.dialog.title',
        maxRecords: Number(this.maxRecords.value),
        lineSeparators: this.lineSeparators.value
      }
    });
    this.inputStructDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reemplazar por la lógica necesaria:
        console.log(`Respuesta :: Estrategia [ ${result.strategy} ] - Contenido del archivo [ ${result.content} ]`);
      }
    });
  }

  // Ejemplo de llamado al dialog ExtractField::
  //============================================
  //openDialogExtractField() {
  //  this.extractFieldDialogRef = this.matDialog.open(ExtractFieldDialogComponent, {
  //    width: '800px',
  //    disableClose: true,
  //    data: {
  //      title: 'label.extract.field.dialog.title',
  //      mode: this.mode,
  //      inputField: this.inputField, // tabla InputField
  //      row: this.row
  //    }
  //  });
  //  this.extractFieldDialogRef.afterClosed().subscribe(result => {
  //    if (result) {
  //      console.log(`Respuesta :: InputField [ ${JSON.stringify(result.inputField)} ]`);
  //    }
  //  });
  //}

  // Ejemplo de llamado al dialog NewField::
  //========================================
  //openDialogNewField() {
  //  this.newFieldDialogRef = this.matDialog.open(NewFieldDialogComponent, {
  //    width: '800px',
  //    disableClose: true,
  //    data: {
  //      title: 'label.new.field.dialog.title',
  //      mode: this.mode,
  //      dataTypeList: JSON.parse(this.dataTypeList.value), // Resolver
  //      type: 'S', // Type de tabla InputStruct
  //      inputField: this.inputField // tabla InputField
  //    }
  //  });
  //  this.newFieldDialogRef.afterClosed().subscribe(result => {
  //    if (result) {
  //      console.log(`Respuesta :: InputField [ ${JSON.stringify(result.inputField)} ]`);
  //    }
  //  });
  //}

  // Ejemplo de llamado al dialog FormatField::
  //========================================
  //openDialogFormatField() {
  //  this.formatFieldDialogRef = this.matDialog.open(FormatFieldDialogComponent, {
  //    width: '800px',
  //    disableClose: true,
  //    data: {
  //      title: 'label.format.field.dialog.title',
  //      mode: this.mode,
  //      dataType: this.inputField.dataType, // Tipo de dato de tabla InputField 02|03|05|06
  //      inputField: this.inputField // Tabla InputField
  //    }
  //  });
  //  this.formatFieldDialogRef.afterClosed().subscribe(result => {
  //    if (result) {
  //      console.log(`Respuesta :: InputField [ ${JSON.stringify(result.inputField)} ]`);
  //    }
  //  });
  //}
}
