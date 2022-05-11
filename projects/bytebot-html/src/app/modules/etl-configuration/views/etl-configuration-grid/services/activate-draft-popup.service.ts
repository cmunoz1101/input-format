import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivateDraftPopupComponent } from '../components/activate-draft-popup/activate-draft-popup.component';

@Injectable({
  providedIn: 'root'
})
export class ActivateDraftPopupService {

  componentRef: MatDialogRef<ActivateDraftPopupComponent>;

  constructor(
    public dialog: MatDialog
  ) { }

  loadComponent(data: any): Observable<boolean> {
    this.componentRef = this.dialog.open(ActivateDraftPopupComponent, {
      disableClose: true,
      data: data
    });

    return this.componentRef.afterClosed().pipe(map(it => {
      return it;
    }));
  }
}
