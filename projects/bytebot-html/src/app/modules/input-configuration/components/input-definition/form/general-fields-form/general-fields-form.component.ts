import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputStruct } from '../../../../models/input-struct';

@Component({
  selector: 'byte-general-fields-form',
  templateUrl: './general-fields-form.component.html',
  styleUrls: ['./general-fields-form.component.scss']
})
export class GeneralFieldsFormComponent implements OnInit {

  /* Componente formulario campos generales.
     =======================================
   Parámetros de entrada:
    1. InputStruct.- Data obtenida de la tabla css_input_struct.
   Parámetros de salida:
    1. InputStruct.- Con los datos obtenidos del formulario.
  */

  form: FormGroup;
  mode: string;
  checkedRB1: boolean;
  checkedRB2: boolean;
  processing: boolean;
  message: string;
  separators: any;
  convertFile: any;
  separatorsListValidate: any;
  inputStruct: InputStruct = { // Data de prueba. Eliminar una vez se pase como parámetro.
    id: 1,
    input: new Input(),
    version: 1,
    draft: 'Y',
    active: 'Y',
    startDate: '09/05/2022',
    endDate: '',
    type: 'S',
    separator: '|',
    startRow: 2,
    autoTrim: 'N',
    fileConvert: ''
  };

  constructor(
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Carga separadores:
    this.separators = JSON.parse(this.route.snapshot.data['separatorsResolver'].value);
    // Carga convertir file:
    this.convertFile = JSON.parse(this.route.snapshot.data['convertFileResolver'].value);
    // Carga lista para validar separador:
    this.separatorsListValidate = this.separators.reduce(function (r, e) {
      console.log(e);
      r[e.id] = e.name;
      return r;
    }, {});

    if (this.mode !== 'new') {
      this.form = new FormGroup({
        structureType: new FormControl(this.inputStruct.type, Validators.required), // F=Fixes position, S=Separator
        separator: new FormControl('', Validators.required),
        otherSeparator: new FormControl('', Validators.required), // Sólo se carga en el formulario, no va a base de datos.
        startRow: new FormControl(this.inputStruct.startRow, [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        dataFileConverter: new FormControl(this.inputStruct.fileConvert),
        includeFieldNames: new FormControl(false, Validators.required), // Sólo se carga en el formulario, no va a base de datos.
        autoTrim: new FormControl(false, Validators.required),
      });
      this.initForm();
    } else {
      this.inputStruct = new InputStruct();
      this.form = new FormGroup({
        structureType: new FormControl('', Validators.required), // F=Fixes position, S=Separator
        separator: new FormControl('', Validators.required),
        otherSeparator: new FormControl('', Validators.required),
        startRow: new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|\\d\\d\\d*)$')]),
        dataFileConverter: new FormControl(''),
        includeFieldNames: new FormControl(false, Validators.required),
        autoTrim: new FormControl(false, Validators.required),
      });
    }
  }

  initForm() {
    this.checkedRB1 = false;
    this.checkedRB2 = false;

    // Carga separator y otherSeparator:
    if (this.inputStruct.separator) {
      if (this.separatorsListValidate[this.inputStruct.separator]) {
        this.form.controls['separator'].setValue(this.inputStruct.separator);
        this.form.controls['otherSeparator'].setValue('');
      } else {
        this.form.controls['separator'].setValue('o');
        this.form.controls['otherSeparator'].setValue(this.inputStruct.separator);
      }
    }
    // Carga autotrim:
    if (this.inputStruct.autoTrim) {
      if (this.inputStruct.autoTrim === 'Y') {
        this.form.controls['autoTrim'].setValue(true);
      } else {
        this.form.controls['autoTrim'].setValue(false);
      }
    }
    // Inicializa Radio Button:
    if (this.form.controls['structureType'].value === 'F') {
      this.checkedRB1 = true;
      this.form.controls['separator'].disable();
      this.form.controls['otherSeparator'].disable();
    } else if (this.form.controls['structureType'].value === 'S') {
      this.checkedRB2 = true;
      this.form.controls['otherSeparator'].disable();
    }
  }

  onChangeRB1() {
    this.form.controls['structureType'].setValue('F');
    this.form.controls['separator'].disable();
    this.form.controls['separator'].setValue('');
    this.form.controls['otherSeparator'].disable();
    this.form.controls['otherSeparator'].setValue('');
  }

  onChangeRB2() {
    this.form.controls['structureType'].setValue('S');
    this.form.controls['separator'].enable();
    if (this.form.controls['separator'].value === 'o') {
      this.form.controls['otherSeparator'].enable();
    }
  }

  onSubmit() {
    this.processing = true;

    let inputStruct = new InputStruct();
    inputStruct.id = this.inputStruct.id;
    inputStruct.input = this.inputStruct.input;
    inputStruct.version = this.inputStruct.version;
    inputStruct.draft = this.inputStruct.draft;
    inputStruct.active = this.inputStruct.active;
    if (this.mode !== 'new') {
      inputStruct.startDate = this.inputStruct.startDate;
    }
    inputStruct.type = this.form.controls['structureType'].value;
    inputStruct.separator = this.form.controls['separator'].value === 'o' ? this.form.controls['otherSeparator'].value : this.form.controls['separator'].value;
    inputStruct.startRow = this.form.controls['startRow'].value;
    inputStruct.autoTrim = this.form.controls['autoTrim'].value === true ? 'Y' : 'N';
    inputStruct.fileConvert = this.form.controls['dataFileConverter'].value;

    this.message = `Respuesta :: InputStruct [ ${JSON.stringify(inputStruct)} ] - Incluye nombre de campos? [ ${this.form.controls['includeFieldNames'].value} ]`;
    //
    this.processing = false;
  }

  onChangeSeparator(event) {
    if (event.value === 'o') {
      this.form.controls['otherSeparator'].enable();
    } else {
      this.form.controls['otherSeparator'].setValue('');
      this.form.controls['otherSeparator'].disable();
    }
  }

}
