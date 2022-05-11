import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, NotificationType } from '@xdf/commons';
import { cssNumber } from 'jquery';
import { FieldsFormComponent } from './components/fields-form/fields-form.component';
import { FieldsFormatDialogService } from './components/fields-format-dialog/services/fields-format-dialog.service';
import { FieldsListComponent } from './components/fields-list/fields-list.component';

@Component({
  selector: 'byte-ec-field-format',
  templateUrl: './ec-field-format.component.html',
  styleUrls: ['./ec-field-format.component.scss']
})
export class EcFieldFormatComponent implements OnInit {

  
  
  dynamic = false;
  mode : string;
  fieldSelectedPos : number;
  fieldSelected :any = {};

  @Input() stepper: MatStepper;

  @ViewChild(FieldsListComponent, { static: true })
  fieldsListComponent: FieldsListComponent;

  @ViewChild(FieldsFormComponent, { static: true })
  fieldsFormComponent: FieldsFormComponent;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  private translateService: TranslateService,
  private fieldsFormatDialogService : FieldsFormatDialogService

  ) { 
    this.mode = this._activatedRoute.snapshot.data.mode;
  }

  fieldsList = [];

  ngOnInit() {

  }

  handleFunction(fun){
    let index = this.fieldsList.findIndex(field => field.position == this.fieldSelectedPos);
    let field = this.fieldsList[index];
    if(fun == 'format') {
      if(field.dataType == 'DATE') {
        if(field['dateFormat']!=undefined){
          console.log('edit mode')
        } else {
          field['dateFormat']="";
        }
      }
      else if(field.dataType == 'DECIMAL') {
        if(field['numberFormat']!=undefined){
          console.log('edit mode')
        } else {
          field['numberFormat']="";
          field['numberFormatGroupingSeparator']="";
          field['numberFormatDecimalSeparator']="";
        }
      }
    } else if(fun == 'posValues') {
      if(field['possibleValues']!=undefined){
        console.log('edit mode')
      } else {
        field['possibleValues']="";
        
      }
    } else if(fun == 'equivIntern') {
      if(field['internalEquivalence']!=undefined){
        console.log('edit mode')
      } else {
        field['internalEquivalence']="";
      }
    } else if(fun == 'exprValid') {
      if(field['regexValidation']!=undefined){
        this.onLoadDialog({
          title : "Expresión de validación",
          mode : "edit",
          section : {
            label: "Ingrese una expresión regular para la validación del campo",
            type: "exprValid",
            config: {
              label: "Expresión de validación"
            },
            record: field['regexValidation']
          }
        })
      } else {
        this.onLoadDialog({
          title : "Expresión de validación",
          mode : "new",
          section : {
            label: "Ingrese una expresión regular para la validación del campo",
            type: "exprValid",
            config: {
              label: "Expresión de validación"
            }
          }
        })
      }
    } else if(fun == 'dependencies') {
      if(field['dependsOn']!=undefined){
        this.onLoadDialog({
          title : "Dependencias",
          mode : "edit",
          section : {
            label: "Seleccione las dependencias del campo",
            type: "dependencies",
            config: {
              label: "Campos seleccionados",
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            },
            record: field['dependsOn']
          }
        })
      } else {
        this.onLoadDialog({
          title : "Dependencias",
          mode : "new",
          section : {
            label: "Seleccione las dependencias del campo",
            type: "dependencies",
            config: {
              label: "Campos seleccionados",
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            }
          }
        })
        
      }
    } else if(fun == 'preProcessor') {
      if(field['preProcessor']!=undefined){
        this.onLoadDialog({
          title : "Pre procesar",
          mode : "edit",
          section : {
            label: "Ingrese las funciones que se ejecutarán antes de las validaciones",
            type: "preProcessor",
            config: {
              functions: field['preProcessor'],
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            }
          }
        })
      } else {
        this.onLoadDialog({
          title : "Pre procesar",
          mode : "new",
          section : {
            label: "Ingrese las funciones que se ejecutarán antes de las validaciones",
            type: "preProcessor",
            config: {
              functions: [],
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            }
          }
        })
      }
    } else if(fun == 'processor') {
      if(field['processor']!=undefined){
        this.onLoadDialog({
          title : "Procesar",
          mode : "edit",
          section : {
            label: "Ingrese las funciones que se ejecutarán después de las validaciones",
            type: "processor",
            config: {
              functions: field['processor'],
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            }
          }
        })
      } else {
        this.onLoadDialog({
          title : "Procesar",
          mode : "new",
          section : {
            label: "Ingrese las funciones que se ejecutarán después de las validaciones",
            type: "processor",
            config: {
              functions: [],
              list: this.fieldsList.map(item =>{
                return item["identifier"]
              })
            }
          }
        })
      }
    }
    
  }

  chargeFields(data: any[]){
    this.fieldsList = data.map((item, index) => {
      let field = {
        "identifier": "$"+item.name.replace(/\s+/g, ''),
        "description": item.name,
        "dataType": item.type,
        "position": index +1,
      }
      return field;
    });
    this.fieldsListComponent.parseData(this.fieldsList)
    this.fieldsListComponent.onSelect(1);

  }

  onFieldSelected(pos) {
    console.log(pos)
    let field = this.fieldsList.find(field => field.position == pos);
    
    if(this.fieldsFormComponent.checkForm()){
    this.dynamic = field.dynamicField == true; 
     this.fieldSelectedPos = pos;
     this.fieldsListComponent.changePosition(this.fieldSelectedPos)

      this.fieldsFormComponent.buildForm(field)
      this.fieldSelected = field;
      
    } else {
      this.notificationService.showMessage(
        this.translateService.instant('label.error.field.params'),
        "", NotificationType.error);
    }

  }

  onFieldChanges(data){
    let index = this.fieldsList.findIndex(field => field.position == this.fieldSelectedPos);
    this.fieldSelected = data;
    this.fieldsList[index] = data;
  }

  onAddDynamicField() {
    if(this.fieldsFormComponent.checkForm()){
      let field = {
        "identifier": "",
        "dynamicField": true,
        "description": "",
        "position": this.fieldsList.length +1,
      }
      this.fieldsList.push(field)
      this.fieldsListComponent.parseData(this.fieldsList)
      this.onFieldSelected(field.position);
    } else {
      this.notificationService.showMessage(
        this.translateService.instant('label.error.field.params'),
        "", NotificationType.error);
    }
  }

  next() {
    this.stepper.next();
  }

  onLoadDialog(config) : any{
    this.fieldsFormatDialogService.loadComponent({...config}).subscribe(
      (data: any) => {
        console.log(data)
        let index = this.fieldsList.findIndex(field => field.position == this.fieldSelectedPos);
        let field = this.fieldsList[index];

        field = {...field, ...data}

        this.fieldsList[index] = field;
        this.fieldSelected = field;
        this.fieldsFormComponent.buildForm(this.fieldSelected);
      }

      
    )
  }
  isDirty() : boolean {
    for(let field of this.fieldsList) {
      if(field.identifier == "" || field.identifier == undefined || field.identifier == null ) {
        return true
      }
      if(field.description == "" || field.description == undefined || field.description == null ) {
        return true
      }
      if(field.dynamicField != true && (field.dataType == "" || field.dataType == undefined || field.dataType == null )) {
        return true
      }

    }
    return false;
  }

}