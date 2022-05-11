import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'byte-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss']
})
export class DragDropListComponent implements OnInit {

  data : any[]= [];
  @Output() dataChanged = new EventEmitter<any>();
  @Output() configuration = new EventEmitter<any>();
  items : any[]= [];
  @Input() mode: string = "";

  constructor() { }

  ngOnInit() {
    this.parseData();
  }

  private checkDate(date){
    return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      .test(date);
  }

  private checkDecimal(number) {
    return /^(?!-0(\.0+)?$)-?(0|[1-9]\d*)(\.\d+)?$/
      .test(number);
  }
  private checkLong(number) {
    return /^-?\d+$/.test(number);
  }

  // parseData(data?) {

  //   this.items = [];
  //   if( data!= null && data!=undefined){
  //     this.data = data;
  //   console.log(this.data)

  //   }
  //   if(this.data != null && this.data!= undefined && this.data.length !== 0){
  //     for(let item of Object.keys(this.data[0])){
  //       let type = "STRING";
  //       if(this.checkDate(this.data[0][item])){
  //         type = "DATE";
  //       }
  //       if(this.checkDecimal(this.data[0][item])) {
  //         type = "DECIMAL";
  //       }
  //       if(this.checkLong(this.data[0][item])) {
  //         type = "LONG";
  //       }
  //       this.items.push({name: item, type: type})
  //     }
      
  //   }
  //   this.configuration.emit(this.items)
  // }

  parseData(data?) {

    this.items = [];
    if( data!= null && data!=undefined){
      this.data = data;
    console.log(this.data)

    }
    if(this.data != null && this.data!= undefined && this.data.length !== 0){
      for(var i = 0; i < this.data.length; i++){
        let keys = Object.keys(this.data[i])
        
        for(let item of keys){
          let type = "STRING";
          if(this.checkDate(this.data[i][item])){
            type = "DATE";
          }
          if(this.checkDecimal(this.data[i][item])) {
            type = "DECIMAL";
          }
          if(this.checkLong(this.data[i][item])) {
            type = "LONG";
          }
          if(i == 0){
            this.items.push({name: item, type: type})
          } else {
            let index = this.items.findIndex( el => el.name == item );
            if(this.items[index].type != type ){
              this.items[index] = {name: this.items[index].name, type: "STRING" }
            }
            
          }
        }
      }
    }
    this.configuration.emit(this.items)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    let arr = []
    for(let row of this.data){
      let obj = {};
      for(let item of this.items){
        obj[item.name] = row[item.name];

      }
      arr.push(obj)
    }
    this.dataChanged.emit(arr);
  }

  onDelete(name) {
    let arr = []
    for(let row of this.data){
      let obj = {};
      for(let item of this.items){
        obj[item.name] = row[item.name];

      }
      delete obj[name];
      arr.push(obj)
    }
    this.dataChanged.emit(arr);
  }

}
