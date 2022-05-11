import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  FirstDataRenderedEvent,
} from "ag-grid-community";

@Component({
  selector: 'byte-source-preview-grid',
  templateUrl: './source-preview-grid.component.html',
  styleUrls: ['./source-preview-grid.component.scss']
})
export class SourcePreviewGridComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  pagination = true;
  paginationPageSize = 6;

  @Input() data:any = []
  @Output() dataChanged = new EventEmitter<any>();

  columnDefs: ColDef[] = [];
  rowData = [];

  constructor() { }

  ngOnInit() {
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
        return { 'background-color': 'rgba(0, 0, 0, 0.05)' };
    }
  }



  onGridReady(params: GridReadyEvent) {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.onDataHandler();
    this.gridApi.setDomLayout('autoHeight');
    params.api.sizeColumnsToFit(); 
  }
  onDataHandler(data?) {
    if( data!= null && data!=undefined){
      this.data = data;
    }
    if(this.data != null && this.data!= undefined && this.data.length !== 0){
      let objKeys = Object.keys(this.data[0]);
      let columnRef = [];
      for (let item of objKeys) {
        let obj = {
          field: item,
          sortable: true,
          editable: true,
          resizable: true,
          suppressNavigable: true,
          suppressMovable: true,
          suppressSizeToFit: false
        };
        columnRef.push(obj);
      }
      this.columnDefs = columnRef;

      this.rowData = this.data.map((item) => {
        let obj = {};
        for (let key of objKeys) {
          obj[key] = item[key];
        }
        return obj;
      });
    }
  }
  onDataChanged() {
    this.dataChanged.emit(this.rowData);

  }

}
