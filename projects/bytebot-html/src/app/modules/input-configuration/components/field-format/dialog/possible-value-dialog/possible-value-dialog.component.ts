import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';
import { InputFieldPossibleValue } from '../../../../models/input-field-possible-value';
import { InputFieldPossibleValueService } from '../../../../services/input-field-possible-value.service';

@Component({
  selector: 'byte-possible-value-dialog',
  templateUrl: './possible-value-dialog.component.html',
  styleUrls: ['./possible-value-dialog.component.scss']
})
export class PossibleValueDialogComponent implements OnInit {

  /* Componente popup para nuevo campo.
    ======================================
  Parámetros de entrada:
   1. Título.
   2. Modo.
   5. InputField.
  Parámetros de salida: 
   1. InputField.
 */

  title: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  mode: string;
  internMode: string;
  valuesFormGroup: FormGroup;
  displayForm: boolean;
  indexSelected: number;
  inputFieldId: number;
  inputFieldPossibleValueList: InputFieldPossibleValue[];

  constructor(
    private newFieldDialogRef: MatDialogRef<PossibleValueDialogComponent>,
    private settingsService: SettingsService,
    protected formBuilder: FormBuilder,
    private inputFieldPossibleValueService: InputFieldPossibleValueService,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.title = data.title;
    this.mode = data.mode;
    this.inputFieldId = data.inputFieldId;
    // Logo ::
    this.settingsService.getApplicationSettings().pipe(first()).subscribe(result => {
      if (result) {
        const logo = result;
        this.logoSrc = 'data:image/'.concat(logo.tipo, ';base64,', logo.logoBase64);
      }
    });
    // Init Form Array ::
    this.valuesFormGroup = this.formBuilder.group({
      valuesArray: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.displayForm = false;
    if (this.mode !== 'new') {
      // Get Values by inputFieldId.
      this.inputFieldPossibleValueService.listByFieldId(this.inputFieldId).subscribe(data => {
        this.inputFieldPossibleValueList = data;
        // Charge Form Array ::
        if (this.inputFieldPossibleValueList !== undefined && this.inputFieldPossibleValueList.length > 0) {
          for (let index in this.inputFieldPossibleValueList) {
            this.chargeFormGroup(this.inputFieldPossibleValueList[index]);
          }
        }
      });
    } else {
      this.inputFieldPossibleValueList = [];
    }
  }

  chargeFormGroup(value: any) {
    const valuesArray = this.valuesFormGroup.controls.valuesArray as FormArray;
    valuesArray.push(this.formBuilder.group({
      value: [value.possibleValue, Validators.required]
    }));
  }

  onClose() {
    this.newFieldDialogRef.close(null);
  }

  onSubmit() {
    this.processing = true;
    let data = this.inputFieldPossibleValueList;
    this.newFieldDialogRef.close(data);
    this.processing = false;
  }

  onNewRecord() {
    this.internMode = 'new';
    const valuesArray = this.valuesFormGroup.controls.valuesArray as FormArray;
    let index = valuesArray.length;
    valuesArray.push(this.formBuilder.group({
      value: ['', Validators.required]
    }));
    this.indexSelected = index;
    this.displayForm = true;
  }

  onCancel(index: number) {
    console.log(index);
    if (this.internMode === 'new') {
      const valuesArray = this.valuesFormGroup.controls.valuesArray as FormArray;
      valuesArray.removeAt(index);
    }
    this.indexSelected = index;
    this.displayForm = false;
  }

  onSave(index: number) {
    const valuesArray = this.valuesFormGroup.controls.valuesArray as FormArray;
    const form = valuesArray.at(index) as FormGroup;
    const value = form.controls['value'].value;
    let inputFieldPossibleValue = new InputFieldPossibleValue();
    inputFieldPossibleValue.possibleValue = value;
    if (this.internMode === 'new') {
      this.inputFieldPossibleValueList.push(inputFieldPossibleValue);
    } else {
      this.inputFieldPossibleValueList[index] = inputFieldPossibleValue;
    }
    this.displayForm = false;
  }

  onEditRecord(index: number) {
    this.internMode = 'edit';
    this.indexSelected = index;
    this.displayForm = true;
  }

  onDeleteRecord(index: number) {
    this.internMode = 'delete';
    const valuesArray = this.valuesFormGroup.controls.valuesArray as FormArray;
    valuesArray.removeAt(index);
    this.inputFieldPossibleValueList.splice(index, 1);
    this.indexSelected = index;
    this.displayForm = false;
  }

}
