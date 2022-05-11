import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byte-field-format',
  templateUrl: './field-format.component.html',
  styleUrls: ['./field-format.component.scss']
})
export class FieldFormatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Ejemplo de llamado al dialog PossibleValue::
  //=============================================
  //openDialogPossibleValues() {
  //  this.possibleValueDialogRef = this.matDialog.open(PossibleValueDialogComponent, {
  //    width: '800px',
  //    disableClose: true,
  //    data: {
  //      title: 'label.possible.values.dialog.title',
  //      mode: this.mode,
  //      inputFieldId: this.inputField.id // Id de tabla InputField
  //    }
  //  });
  //  this.possibleValuesDialogRef.afterClosed().subscribe(result => {
  //    if (result) {
  //      console.log(`Respuesta :: InternalPossibleValues [ ${JSON.stringify(result)} ]`);
  //    }
  //  });
  //}

}
