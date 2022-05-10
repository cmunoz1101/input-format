import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';

@Component({
  selector: 'byte-extract-field-dialog',
  templateUrl: './extract-field-dialog.component.html',
  styleUrls: ['./extract-field-dialog.component.scss']
})
export class ExtractFieldDialogComponent implements OnInit {

  /* Componente popup para extraer campo.
   ======================================
 Parámetros de entrada:
  1. Registro de la trama
 Parámetros de salida: 
  1. 
*/

  title: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  mode: string;
  preview: string = '';
  row: string;

  constructor(
    private extractFieldDialogRef: MatDialogRef<ExtractFieldDialogComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.title = data.title;
    this.mode = data.mode;
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
    if (this.mode !== 'new') {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        initialPosition: new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        length: new FormControl('', Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$'))
      })
    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        initialPosition: new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        length: new FormControl('', Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$'))
      })
    }
  }

  close() {
    this.extractFieldDialogRef.close(null);
  }

  onSubmit() {
    this.processing = true;
    let data = {};
    data['name'] = this.form.value['name'];
    data['initialPosition'] = this.form.value['initialPosition'];
    data['length'] = this.form.value['length'];
    this.extractFieldDialogRef.close(data);
    this.processing = false;
  }

  onChangeInitialPosition(event) {
    let length = this.form.controls['length'].value;
    const initialPosition = event - 1;
    if (initialPosition >= 0) {
      if (length && length > 0) {
        length = +length + +initialPosition;
        this.preview = this.row.substring(initialPosition, length);
      } else {
        this.preview = this.row.substring(initialPosition);
      }
    }
  }

  onChangeLength(event) {
    let length = event;
    const initialPosition = this.form.controls['initialPosition'].value - 1;
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
