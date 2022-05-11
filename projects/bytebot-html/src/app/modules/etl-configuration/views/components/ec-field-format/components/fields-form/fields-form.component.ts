import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldsFormatDialogService } from '../fields-format-dialog/services/fields-format-dialog.service';

@Component({
  selector: 'byte-fields-form',
  templateUrl: './fields-form.component.html',
  styleUrls: ['./fields-form.component.scss']
})
export class FieldsFormComponent implements OnInit {

  dymamicAdvancedValidation = {
    "format" : false,
    "dependencies": false,
    "preProcessor": false,
    "equivIntern": false,
    "processor": false
  }
  advancedValidation = {
    "format": false,
    "posValues": false,
    "equivIntern": false,
    "exprValid" : false
  }

  @Output() changesItemSelected = new EventEmitter<any>();
  @Output() editValidation = new EventEmitter<any>();
  field : any = {};
  form: FormGroup;
  dataTypes= [{
    value: "DATE",
    label: "Fecha"
  },{
    value: "LONG",
    label: "Número"
  },{
    value: "DECIMAL",
    label: "Decimal"
  },{
    value: "STRING",
    label: "Text"
  }]

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      identifier: new FormControl({ value: "", disabled: false }, 
      [Validators.required, Validators.pattern(/^[$][a-zA-Z0-9]+$/)]),
      optional: new FormControl({ value: false, disabled: false }),
      description: new FormControl({ value: "", disabled: false }, Validators.required),
      dataType: new FormControl({ value: "", disabled: false }, Validators.required),
      maxLength: new FormControl({ value: "", disabled: false }),
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((data)=>{
      if(this.form.valid){
        this.field.identifier = data.identifier;
        this.field.optional = data.optional;
        data.optional == false ? this.field.optional = undefined : this.field.optional = data.optional;
        this.field.description = data.description;
        this.field.dataType = data.dataType;
        data.maxLength == "" ? this.field.maxLength = undefined : this.field.maxLength = data.maxLength;
        this.changesItemSelected.emit(this.field)
      }
    })
  }

  checkObjectFalse(obj) {
    return Object.values(obj).every((v) => v === false)

  }

  checkForm(): boolean{
    if(this.form.touched && this.form.invalid){
      return false
    }
    return true;

  }

  updateAdvancedValidation() {
    
    if(this.field.dynamicField) {
      if(this.field.dataType == 'DATE') {
        this.field['dateFormat']!=undefined 
        ? this.dymamicAdvancedValidation["format"] = true
        : this.dymamicAdvancedValidation["format"] = false;
      }
      else if(this.field.dataType == 'DECIMAL') {
        this.field['numberFormat']!=undefined 
        ? this.dymamicAdvancedValidation["format"] = true
        : this.dymamicAdvancedValidation["format"] = false;
      } else{
        this.dymamicAdvancedValidation["format"] = false;
      }
      this.field['dependsOn']!=undefined 
      ? this.dymamicAdvancedValidation["dependencies"] = true
      : this.dymamicAdvancedValidation["dependencies"] = false;

      this.field['preProcessor']!=undefined 
      ? this.dymamicAdvancedValidation["preProcessor"] = true
      : this.dymamicAdvancedValidation["preProcessor"] = false;

      this.field['internalEquivalence']!=undefined 
      ? this.dymamicAdvancedValidation["equivIntern"] = true
      : this.dymamicAdvancedValidation["equivIntern"] = false;

      this.field['processor']!=undefined 
      ? this.dymamicAdvancedValidation["processor"] = true
      : this.dymamicAdvancedValidation["processor"] = false;

    } else {
      if(this.field.dataType == 'DATE') {
        this.field['dateFormat']!=undefined 
        ? this.advancedValidation["format"] = true
        : this.advancedValidation["format"] = false;
      }
      else if(this.field.dataType == 'DECIMAL') {
        this.field['numberFormat']!=undefined 
        ? this.advancedValidation["format"] = true
        : this.advancedValidation["format"] = false;
      } else {
        this.advancedValidation["format"] = false;

      }

      this.field['possibleValues']!=undefined 
      ? this.advancedValidation["posValues"] = true
      : this.advancedValidation["posValues"] = false;

      this.field['internalEquivalence']!=undefined 
      ? this.advancedValidation["equivIntern"] = true
      : this.advancedValidation["equivIntern"] = false;

      this.field['regexValidation']!=undefined 
      ? this.advancedValidation["exprValid"] = true
      : this.advancedValidation["exprValid"] = false;

    }
  }

  buildForm(field){
    this.field = field; 
    this.form.patchValue({
      identifier: field.identifier,
      optional: field.optional,
      description: field.description,
      dataType: field.dataType,
      maxLength: field.maxLength
    });
    if(field.dynamicField){
      this.form.get('dataType').clearValidators();
      
    }else {
      this.form.get('dataType').setValidators(Validators.required)
    }
    this.form.get('dataType').updateValueAndValidity()
    this.form.markAllAsTouched();
    this.updateAdvancedValidation()
    console.log(field)
  }

  onEditValidation(fun: string){
    this.editValidation.emit(fun);
  }

  onDeleteValidation(fun: string){
    if(fun == 'format') {
    }
    if(fun == 'posValues') {

    }
    if(fun == 'equivIntern') {
      

    }
    if(fun == 'exprValid') {
      delete this.field["regexValidation"]
    }
    if(fun == 'dependencies') {
      delete this.field["dependsOn"]
    }
    if(fun == 'preProcessor') {
      delete this.field["preProcessor"]
    }
    if(fun == 'processor') {
      delete this.field["processor"]
    }
    this.changesItemSelected.emit(this.field)
    this.updateAdvancedValidation()

  }

  


}
