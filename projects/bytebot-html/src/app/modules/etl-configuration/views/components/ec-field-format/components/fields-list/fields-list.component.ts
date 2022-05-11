import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'byte-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.scss']
})
export class FieldsListComponent implements OnInit {

  data : any[]= [];
  selectedPosition = null;
  @Output() itemSelected = new EventEmitter<any>();
  items : any[]= [];

  constructor() { }

  ngOnInit() {
  }

  onSelect(pos){
    this.itemSelected.emit(pos);
  }
  changePosition(pos){
    this.selectedPosition = pos;

  }

  parseData(data) {
    this.items = data;
    
  }

  

}
