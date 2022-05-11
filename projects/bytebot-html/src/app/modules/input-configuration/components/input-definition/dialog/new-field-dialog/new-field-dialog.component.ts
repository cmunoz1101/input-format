import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';
import { InputField } from '../../../../models/input-field';
import { InputMapping } from '../../../../models/input-mapping';

@Component({
  selector: 'byte-new-field-dialog',
  templateUrl: './new-field-dialog.component.html',
  styleUrls: ['./new-field-dialog.component.scss']
})
export class NewFieldDialogComponent implements OnInit {

  /* Componente popup para nuevo campo.
 ======================================
Parámetros de entrada:
1. Título.
2. Modo.
3. Lista de tipos de dato (Valores posibles).
4. Type de InputStruct.
5. InputField.
Parámetros de salida: 
1. InputField.
*/

  title: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  mode: string;
  dataTypeList: any[];
  type: string;
  inputField: InputField;

  constructor(
    private newFieldDialogRef: MatDialogRef<NewFieldDialogComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.title = data.title;
    this.mode = data.mode;
    this.dataTypeList = data.dataTypeList;
    this.type = data.type;
    this.inputField = data.inputField;
    // Logo ::
    this.settingsService.getApplicationSettings().pipe(first()).subscribe(result => {
      if (result) {
        const logo = result;
        this.logoSrc = 'data:image/'.concat(logo.tipo, ';base64,', logo.logoBase64);
      }
    });
  }

  ngOnInit() {
    if (this.mode !== 'new') {
      this.form = new FormGroup({
        name: new FormControl(this.inputField.identifier, Validators.required),
        dataType: new FormControl(this.inputField.dataType, Validators.required)
      })
      if (this.type === 'F') {
        this.form.addControl('initialPosition', new FormControl(this.inputField.inputMapping.startPosition, [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]));
        this.form.addControl('length', new FormControl(this.inputField.inputMapping.length, [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]));
      }
    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        dataType: new FormControl('', Validators.required)
      })
      if (this.type === 'F') {
        this.form.addControl('initialPosition', new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]));
        this.form.addControl('length', new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]));
      }
    }
  }

  close() {
    this.newFieldDialogRef.close(null);
  }

  onSubmit() {
    this.processing = true;

    let inputField: InputField;
    let inputMapping: InputMapping;

    if (this.mode !== 'new') {
      inputField = this.inputField;
      inputMapping = this.inputField.inputMapping;
    } else {
      inputField = new InputField();
      inputMapping = new InputMapping();
    }

    inputField.identifier = this.form.controls['name'].value;
    inputField.dataType = this.form.controls['dataType'].value;
    if (this.type === 'F') {
      inputMapping.startPosition = this.form.controls['initialPosition'].value;
      inputMapping.length = this.form.controls['length'].value;
    }

    inputField.inputMapping = inputMapping;

    let data = {};
    data['inputField'] = inputField;
    this.newFieldDialogRef.close(data);
    this.processing = false;
  }

}
