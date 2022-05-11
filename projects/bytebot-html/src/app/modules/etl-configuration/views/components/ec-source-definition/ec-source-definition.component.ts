import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { EtlConfigurationService } from '../../../services/etl-configuration.service';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { SourcePreviewGridComponent } from './components/source-preview-grid/source-preview-grid.component';

@Component({
  selector: 'byte-ec-source-definition',
  templateUrl: './ec-source-definition.component.html',
  styleUrls: ['./ec-source-definition.component.scss']
})
export class EcSourceDefinitionComponent implements OnInit {

  @ViewChild(DragDropListComponent, { static: true })
  dragDropListComponent: DragDropListComponent;

  @ViewChild(SourcePreviewGridComponent, { static: true })
  sourcePreviewGridComponent: SourcePreviewGridComponent;

  header : boolean = false;
  mode : string;
  dragDropMode = "fixed"
  @Input() stepper: MatStepper;
  data= []
  configuration= []
  inputFile = new FormControl()
  sourceDefinitionSave = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { 
    this.mode = this._activatedRoute.snapshot.data.mode;
  }

 onDataChanged(data) {
   
  this.data = data;
  this.sourcePreviewGridComponent.onDataHandler(this.data)
  this.dragDropListComponent.parseData(this.data);

 }
  ngOnInit() {
  
  }

  onConfigurationHandler(data) {
    this.configuration = data;
  }

  onInputFile(event) {
    this.getDataFile(event.target.files[0]).then(data=> {
      this.onDataChanged(data)
      
    })
    
  }

  private getDataFile(file: File) : Promise<string | any> {
    return new Promise<string | any>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {

        let data = e.target.result
        let parsedata = [];

        let newLinebrk = data.split("\n");
        let newLength =  newLinebrk.length >= 12 ? 12 : newLinebrk.length
        if(!this.header){
          for(let i = 0; i < newLength; i++) {
            let row = {}

            newLinebrk[i].split(",").forEach((value, index) => {
              row["Campo "+Number(index+1)] = value;
          });
            parsedata.push(row)
          }
        }
        
        return resolve(parsedata);

      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);

      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);

      }
      reader.readAsBinaryString(file);
    })
  
  };

  isDirty() :boolean {
    if(this.data.length !== 0 && this.configuration.length != 0){
      return false
    }
    return true
  }

  next() {
    this.stepper.next();
    this.sourceDefinitionSave.next({source: this.data, configuration: this.configuration})
  }

  

}
