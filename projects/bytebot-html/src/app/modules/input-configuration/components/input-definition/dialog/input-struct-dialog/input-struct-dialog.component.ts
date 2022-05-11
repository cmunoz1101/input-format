import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, NotificationType } from '@xdf/commons';
import { SettingsService } from '@xdf/layouts';
import { first } from 'rxjs/operators';

@Component({
  selector: 'byte-input-struct-dialog',
  templateUrl: './input-struct-dialog.component.html',
  styleUrls: ['./input-struct-dialog.component.scss']
})
export class InputStructDialogComponent implements OnInit {

  /* Componente popup para seleccionar estrategia.
     =============================================
   Parámetros de entrada:
    1. Título del popup
    2. Máximo de registros de lectura.
    3. Separadores de línea.
   Parámetros de salida: 
    1. Estrategia: E=Ingreso libre, F=Según archivo base.
    2. Contenido: Sí estrategia es F entonces retornará un arreglo con los n primeras tramas del archivo leído. Sino retorna undefined.
  */

  title: string;
  maxRecords: number;
  lineSeparators: string;
  logoSrc: any;
  form: FormGroup;
  processing: boolean = false;
  file: File;
  fileName: string;
  uploadFile: boolean;
  content: string[];

  constructor(
    private strategyDialogRef: MatDialogRef<InputStructDialogComponent>,
    private settingsService: SettingsService,
    @Inject(MAT_DIALOG_DATA) private data,
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) {
    this.title = data.title;
    this.maxRecords = data.maxRecords;
    this.lineSeparators = data.lineSeparators;
    // Logo ::
    this.settingsService.getApplicationSettings().pipe(first()).subscribe(result => {
      if (result) {
        const logo = result;
        this.logoSrc = 'data:image/'.concat(logo.tipo, ';base64,', logo.logoBase64);
      }
    });
  }

  ngOnInit() {
    // strategy:: E=Ingreso libre, F=Según archivo base. (Inicializar en 'E').
    this.form = new FormGroup({
      strategy: new FormControl('E', Validators.required),
      fileName: new FormControl('', Validators.pattern('^.*\.(csv|txt|CSV|TXT)$'))
    });
  }

  close() {
    this.strategyDialogRef.close(null);
  }

  changeStrategy(event) {
    this.uploadFile = false;
    if (event.value === 'F') {
      this.uploadFile = true;
    } else {
      this.form.controls['fileName'].setValue('');
    }
  }

  onSubmit() {
    this.processing = true;
    let data = {};
    data['strategy'] = this.form.value['strategy'];
    data['content'] = this.content;
    this.strategyDialogRef.close(data);
    this.processing = false;
  }

  onFileSelected(input) {

    let file = input.target.files[0];
    let fileReader = new FileReader();

    this.content = [];

    fileReader.onload = () => {
      let result = fileReader.result.toString();
      let fileContentArray = result.split(this.lineSeparators);
      for (let line = 0; line < this.maxRecords; line++) {
        this.content.push(fileContentArray[line]);
      }
      console.log(this.content);
      this.form.controls['fileName'].setValue(input.target.files[0].name);
    };

    fileReader.onerror = () => {
      const messageUploadError = this.translateService.instant('file-upload.fileName.error.message');
      this.notificationService.showMessage(messageUploadError, this.translateService.instant('title.error'), NotificationType.error);
    };

    fileReader.readAsText(file);
  }

}
