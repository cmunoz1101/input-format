import { Injectable, ViewContainerRef } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FieldsFormatDialogComponent } from "../fields-format-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class FieldsFormatDialogService {

    componentRef: MatDialogRef<FieldsFormatDialogComponent>;

  constructor(
    public dialog: MatDialog
  ) { }

  loadComponent(data: any): Observable<boolean> {
    this.componentRef = this.dialog.open(FieldsFormatDialogComponent, {
      disableClose: true,
      data: data
    });

    return this.componentRef.afterClosed().pipe(map(it => {
      return it;
    }));
  }
}
