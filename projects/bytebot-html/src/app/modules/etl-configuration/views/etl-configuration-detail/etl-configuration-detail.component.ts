import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@xdf/layouts';
import { Subscription } from 'rxjs';
import { EcFieldFormatComponent } from '../components/ec-field-format/ec-field-format.component';
import { EcSourceDefinitionComponent } from '../components/ec-source-definition/ec-source-definition.component';

@Component({
  selector: 'byte-etl-configuration-detail',
  templateUrl: './etl-configuration-detail.component.html',
  styleUrls: ['./etl-configuration-detail.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class EtlConfigurationDetailComponent implements OnInit, OnDestroy {

  private backSubscription: Subscription;

  @ViewChild(EcSourceDefinitionComponent, { static: true })
  ecSourceDefinitionComponent: EcSourceDefinitionComponent;

  @ViewChild(EcFieldFormatComponent, { static: true })
  ecFieldFormatComponent: EcFieldFormatComponent;

  sourceAllData = []
  formatFields = []
  constructor(
    protected router: Router,
    private backService: ReturnService) { 
    this.backSubscription = this.backService.backEvent.subscribe(message => {
      if (message !== null) {
        this.router.navigate(['/etl_configuration']);
      }
    });
  }
  ngOnDestroy(): void {
    this.backSubscription.unsubscribe();
    this.backService.reset();
  }

  ngOnInit() {
    this.ecSourceDefinitionComponent.sourceDefinitionSave.subscribe((data)=>{
      if(data.source != this.sourceAllData && data.configuration != this.formatFields){
        this.sourceAllData = data.source;
        this.formatFields = data.configuration;
        this.ecFieldFormatComponent.chargeFields(this.formatFields)
      }
      
    })
  }



  isDirty(): boolean {
    let dirty = false;

    // dirty = this.generalInformationComponent.isDirty()
    //   || this.connectionsComponent.isDirty()
    //   || this.entitiesComponent.isDirty()
    //   || this.stepsComponent.isDirty();

    // if (dirty) {
    //   dirty = this.summaryComponent.isDirty();
    // }

    return dirty;
  }

}
