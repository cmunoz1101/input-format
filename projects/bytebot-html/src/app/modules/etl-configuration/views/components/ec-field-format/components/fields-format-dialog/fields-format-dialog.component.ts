import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, NotificationType } from '@xdf/commons';
import { first } from 'rxjs/operators';

@Component({
  selector: 'byte-fields-format-dialog',
  templateUrl: './fields-format-dialog.component.html',
  styleUrls: ['./fields-format-dialog.component.scss']
})
export class FieldsFormatDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FieldsFormatDialogComponent>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.title = data.title;
    this.mode = data.mode;
    this.section = data.section;
    console.log(this.section)
  }

  selectedPosition: any;
  logoSrc: any;
  title: string;
  section : any;
  mode: any;
  form: FormGroup;
  record: any;

  ngOnInit() {
    this.logoSrc = "assets/images/logo_byte_menu-min.png"
    

    // Sample: exprValid
    // this.title = "Expresión de validación"
    // this.mode = "new";
    // this.section = {
    //   label: "Ingrese una expresión regular para la validación del campo",
    //   type: "exprValid",
    //   config: {
    //     label: "Expresión de validación"
    //   }
    // }

    // Sample: dependencies
    // this.title = "Dependencias"
    // this.mode = "new";
    // this.section = {
    //   label: "Seleccione las dependencias del campo",
    //   type: "dependencies",
    //   config: {
    //     label: "Campos seleccionados",
    //     list: [
    //       "$fechaConciliacion",
    //       "$referencia1",
    //       "$referencia2",
    //       "$referencia3",
    //       "$debito",
    //       "$monto",
    //       "$concepto"
    //     ]
    //   },
    //   record: ""
    // }

    // Sample: preProcessor
    // this.title = "Pre procesar"
    // this.mode = "new";
    // this.section = {
    //   label: "Ingrese las funciones que se ejecutarán antes de las validaciones",
    //   type: "preProcessor",
    //   config: {
    //     functions: [],
    //     list: [
    //       "$fechaConciliacion",
    //       "$referencia1",
    //       "$referencia2",
    //       "$referencia3",
    //       "$debito",
    //       "$monto",
    //       "$concepto"
    //     ]
        
    //   },
    // }

    // this.title = "Procesar"
    // this.mode = "new";
    // this.section = {
    //   label: "Ingrese las funciones que se ejecutarán después de las validaciones",
    //   type: "processor",
    //   config: {
    //     functions: [],
    //     list: [
    //       "$fechaConciliacion",
    //       "$referencia1",
    //       "$referencia2",
    //       "$referencia3",
    //       "$debito",
    //       "$monto",
    //       "$concepto"
    //     ]
        
    //   },
    // }

    this.buildForm();
    

  }

  buildForm() {
    if(this.mode != 'new'){
      if (this.section.type == "exprValid"){
        this.form = this.formBuilder.group({
          exprValid: new FormControl(this.section.record, [Validators.required, validateRegex])
        });
      }
      if (this.section.type == "dependencies"){
        console.log("a",this.section.record)
        this.form = this.formBuilder.group({
          dependencies: new FormControl(this.section.record, [Validators.required])
        });
      }

      if (this.section.type == "preProcessor" || this.section.type == "processor"){
        console.log("a",this.section.config.functions)
        this.form = this.formBuilder.group({
          functionName: new FormControl(this.section.config.functions[0].functionName, [Validators.required]),
          constantParam: new FormControl(""),
          dynamicParam: new FormControl("")
        });
        this.selectedPosition = 0;
        this.form.valueChanges.subscribe((data)=>{
          if(this.form.valid){
            this.section.config.functions[this.selectedPosition].functionName = data.functionName;
          }
        })
        
      }
    } else {
      if (this.section.type == "exprValid"){
        this.form = this.formBuilder.group({
          exprValid: new FormControl("",  [Validators.required, validateRegex])
        });
      }
      if (this.section.type == "dependencies"){
        this.form = this.formBuilder.group({
          dependencies: new FormControl("", [Validators.required])
        });
      }

      if (this.section.type == "preProcessor" || this.section.type == "processor"){
        this.form = this.formBuilder.group({
          functionName: new FormControl("", [Validators.required]),
          constantParam: new FormControl(""),
          dynamicParam: new FormControl("")
        });
        this.onAddFunction();
        this.form.valueChanges.subscribe((data)=>{
          if(this.form.valid){
            this.section.config.functions[this.selectedPosition].functionName = data.functionName;
          }
        })

      }
    }
    
    
  }

  addConstantParam(){
    if(this.form.controls["constantParam"].value != ""){

      this.section.config.functions[this.selectedPosition].params.push(
        this.form.controls["constantParam"].value
      )
      this.form.controls["constantParam"].setValue("");
    } else {
      this.notificationService.showMessage(
        // this.translateService.instant('label.error.field.params'),
        "No se puede ingresar un parametro vacío",
        "", NotificationType.error);
    }

  }

  addDynamicParam(){
      
      if(this.form.controls["dynamicParam"].value != ""){
        this.section.config.functions[this.selectedPosition].params.push(
          this.form.controls["dynamicParam"].value
        )
        this.form.controls["dynamicParam"].setValue("");
      } else {
        this.notificationService.showMessage(
          // this.translateService.instant('label.error.field.params'),
          "No se puede ingresar un parametro vacío",
          "", NotificationType.error);
      }
    
  }

  onDeleteParam(i){
    this.section.config.functions[this.selectedPosition].params.splice(i,1)
  }

  validateFunction() : boolean{
    return this.form.valid && this.section.config.functions[this.selectedPosition].params.length
  }

  onAddFunction() {
    if(this.validateFunction() || this.section.config.functions.length == 0){
      this.section.config.functions.push({
        "functionName": "",
            "params": [
            ]
      })
      this.onSelect(this.section.config.functions.length-1);
    } else {
      if(this.form.invalid){
        this.notificationService.showMessage(
          this.translateService.instant('label.error.field.params'),
          "", NotificationType.error);
      }else {
        this.notificationService.showMessage(
          // this.translateService.instant('label.error.field.params'),
          "Ingresar al menos un parametro",
          "", NotificationType.error);
      }
    }
    
  }
  onSelect(i){
      if(this.validateFunction()  || this.section.config.functions.length == 1){
        this.selectedPosition = i;

        this.form.patchValue({
          functionName: this.section.config.functions[i].functionName,
          constantParam: "",
          dynamicParam: "",
        });
      } else {
        if(this.form.invalid){
          this.notificationService.showMessage(
            this.translateService.instant('label.error.field.params'),
            "", NotificationType.error);
        }else {
          this.notificationService.showMessage(
            // this.translateService.instant('label.error.field.params'),
            "Ingresar al menos un parametro",
            "", NotificationType.error);
        }
      }

  }

  onDelete() {
    this.section.config.functions.splice(this.selectedPosition,1)
    this.selectedPosition = this.section.config.functions.length-1;

    this.onSelect(this.section.config.functions.length-1);

  }


  checkForm() : boolean{
    if (this.section.type == "exprValid"){
      if(this.form.invalid) {
        return true;
      }
    }
    if (this.section.type == "dependencies"){
      if(this.form.invalid) {
        return true;
      }
    }

    if (this.section.type == "preProcessor" || this.section.type == "processor"){
      if(this.section.config.functions.length != 0){
        let invalid = false;
        for(let f of this.section.config.functions) {
          if(f.functionName != "" && f.params.length != 0){
            invalid = invalid && false;
          } else {
            invalid = true;
            break;
          }
        }
        return invalid;

      }
      return true;

    }
    return false;
  }

  save(){
    if (this.section.type == "exprValid"){
      this.dialogRef.close({regexValidation: this.form.value["exprValid"]});
    }
    if (this.section.type == "dependencies"){
      this.dialogRef.close({dependsOn: this.form.value["dependencies"]});
      
    }

    if (this.section.type == "preProcessor"){
      this.dialogRef.close({preProcessor: this.section.config.functions});

    }
    if (this.section.type == "processor"){
      this.dialogRef.close({processor: this.section.config.functions});
      
    }
  }

  close() {
    this.dialogRef.close(null);
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close(null);
  }

}

function validateRegex(control: AbstractControl): {[key: string]: any} | null  {
  console.log(control.value)
  if (control.value) {
    var isValid = true;
    try {
      let a = new RegExp(control.value);

  } catch(e) {
      isValid = false;
  }
  
    if(!isValid) {
      return { 'regexInvalid': true };
    }
  }
  return null;
}
