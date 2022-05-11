import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@xdf/commons';

@Component({
  selector: 'byte-activate-draft-popup',
  templateUrl: './activate-draft-popup.component.html',
  styleUrls: ['./activate-draft-popup.component.scss']
})
export class ActivateDraftPopupComponent implements OnInit {

  form: FormGroup;

  
  constructor(
    public dialogRef: MatDialogRef<ActivateDraftPopupComponent>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }

  logoSrc: any;


  ngOnInit() {
    this.logoSrc = "assets/images/logo_byte_menu-min.png"
    this.form = new FormGroup({
      option: new FormControl('now')
    })

    this.form.controls["option"].valueChanges.subscribe(
      (data) => {
        if(data == "after"){ 
          this.form.addControl("startDate", new FormControl({},Validators.required))
        } else {
          this.form.removeControl("startDate")
        }
      }
    )
  }

  close() {
    this.dialogRef.close(null);
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close(null);
  }

  

}
