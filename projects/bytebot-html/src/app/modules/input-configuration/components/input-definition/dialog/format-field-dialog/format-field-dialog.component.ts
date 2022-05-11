import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';
import { InputField } from '../../../../models/input-field';

@Component({
  selector: 'byte-format-field-dialog',
  templateUrl: './format-field-dialog.component.html',
  styleUrls: ['./format-field-dialog.component.scss']
})
export class FormatFieldDialogComponent implements OnInit {

  /* Componente popup para formatear campo.
   ======================================
 Parámetros de entrada:
  1. Título
  2. Modo
  3. Tipo de dato
  4. InputField.
 Parámetros de salida: 
  1. InputField.
*/

  title: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  mode: string;
  dataType: string;
  inputField: InputField;

  constructor(
    private formatFieldDialogRef: MatDialogRef<FormatFieldDialogComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.title = data.title;
    this.mode = data.mode;
    this.dataType = data.dataType;
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
    this.form = new FormGroup({});
    if (this.mode !== 'new') {
      if (this.dataType === '05' || this.dataType === '06') {
        this.form.addControl('dateFormat', new FormControl(this.inputField.dateFormat, Validators.required));
      } else if (this.dataType === '02') {
        this.form.addControl('numberFormatGroupingSeparator', new FormControl(this.inputField.groupSeparator, Validators.required));
        this.form.addControl('absolute', new FormControl(this.inputField.absolute === 'Y' ? true : false));
      } else if (this.dataType === '03') {
        this.form.addControl('numberFormat', new FormControl(this.inputField.numberFormat, Validators.required));
        this.form.addControl('numberFormatDecimalSeparator', new FormControl(this.inputField.decimalSeparator));
        this.form.addControl('numberFormatGroupingSeparator', new FormControl(this.inputField.groupSeparator));
        this.form.addControl('absolute', new FormControl(this.inputField.absolute === 'Y' ? true : false));
      }
    } else {
      if (this.dataType === '05' || this.dataType === '06') {
        this.form.addControl('dateFormat', new FormControl('', Validators.required));
      } else if (this.dataType === '02') {
        this.form.addControl('numberFormatGroupingSeparator', new FormControl('', Validators.required));
        this.form.addControl('absolute', new FormControl(false));
      } else if (this.dataType === '03') {
        this.form.addControl('numberFormat', new FormControl('', Validators.required));
        this.form.addControl('numberFormatDecimalSeparator', new FormControl(''));
        this.form.addControl('numberFormatGroupingSeparator', new FormControl(''));
        this.form.addControl('absolute', new FormControl(false));
      }
    }
  }

  close() {
    this.formatFieldDialogRef.close(null);
  }

  onSubmit() {
    this.processing = true;

    let inputField: InputField;

    if (this.mode !== 'new') {
      inputField = this.inputField;
    } else {
      inputField = new InputField();
    }

    if (this.dataType === '05' || this.dataType === '06') {
      inputField.dateFormat = this.form.controls['dateFormat'].value;
    } else if (this.dataType === '02') {
      inputField.groupSeparator = this.form.controls['numberFormatGroupingSeparator'].value;
      inputField.absolute = this.form.controls['absolute'].value === true ? 'Y' : 'N';
    } else if (this.dataType === '03') {
      inputField.numberFormat = this.form.controls['numberFormat'].value;
      inputField.decimalSeparator = this.form.controls['numberFormatDecimalSeparator'].value;
      inputField.groupSeparator = this.form.controls['numberFormatGroupingSeparator'].value;
      inputField.absolute = this.form.controls['absolute'].value === true ? 'Y' : 'N';
    }

    let data = {};
    data['inputField'] = inputField;
    this.formatFieldDialogRef.close(data);
    this.processing = false;
  }

}
