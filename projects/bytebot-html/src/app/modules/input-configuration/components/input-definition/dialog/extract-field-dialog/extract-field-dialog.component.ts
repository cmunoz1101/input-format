import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';
import { InputField } from '../../../../models/input-field';
import { InputMapping } from '../../../../models/input-mapping';

@Component({
  selector: 'byte-extract-field-dialog',
  templateUrl: './extract-field-dialog.component.html',
  styleUrls: ['./extract-field-dialog.component.scss']
})
export class ExtractFieldDialogComponent implements OnInit {

  /* Componente popup para extraer campo.
   ======================================
 Parámetros de entrada:
  1. Título
  2. Modo
  3. InputField
  4. Fila de la trama.
 Parámetros de salida: 
  1. InputField
*/

  title: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  mode: string;
  preview: string = '';
  inputField: InputField;
  row: string;

  constructor(
    private extractFieldDialogRef: MatDialogRef<ExtractFieldDialogComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.title = data.title;
    this.mode = data.mode;
    this.inputField = data.inputField;
    this.row = data.row;
    // Logo ::
    this.settingsService.getApplicationSettings().pipe(first()).subscribe(result => {
      if (result) {
        const logo = result;
        this.logoSrc = 'data:image/'.concat(logo.tipo, ';base64,', logo.logoBase64);
      }
    });
  }

  ngOnInit() {
    console.log(this.inputField);
    if (this.mode !== 'new') {
      this.form = new FormGroup({
        name: new FormControl(this.inputField.identifier, Validators.required),
        initialPosition: new FormControl(this.inputField.inputMapping.startPosition, [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        length: new FormControl(this.inputField.inputMapping.length, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$'))
      });
      this.initForm();
    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        initialPosition: new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        length: new FormControl('', Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$'))
      });
    }
  }

  initForm() {
    let length = this.form.controls['length'].value;
    const initialPosition = this.form.controls['initialPosition'].value - 1;
    this.generatePreview(initialPosition, length);
  }

  close() {
    this.extractFieldDialogRef.close(null);
  }

  onSubmit() {
    this.processing = true;

    let inputField: InputField;
    let inputMapping: InputMapping;

    if (this.mode !== 'new') {
      inputField = this.inputField;
      inputMapping = this.inputField.inputMapping;
    } else {
      inputField = new InputField;
      inputMapping = new InputMapping();
    }

    inputField.identifier = this.form.controls['name'].value;
    inputMapping.startPosition = this.form.controls['initialPosition'].value;
    inputMapping.length = this.form.controls['length'].value;

    inputField.inputMapping = inputMapping;

    let data = {};
    data['inputField'] = inputField;
    this.extractFieldDialogRef.close(data);
    this.processing = false;
  }

  onChangeInitialPosition(event) {
    let length = this.form.controls['length'].value;
    const initialPosition = event - 1;
    this.generatePreview(initialPosition, length);
  }

  onChangeLength(event) {
    let length = event;
    const initialPosition = this.form.controls['initialPosition'].value - 1;
    this.generatePreview(initialPosition, length);
  }

  generatePreview(initialPosition: number, length: number) {
    if (initialPosition >= 0) {
      if (length && length > 0) {
        length = +length + +initialPosition;
        this.preview = this.row.substring(initialPosition, length);
      } else {
        this.preview = this.row.substring(initialPosition);
      }
    }
  }

}
