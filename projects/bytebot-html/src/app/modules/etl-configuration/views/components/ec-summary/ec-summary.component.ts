import { Component, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'byte-ec-summary',
  templateUrl: './ec-summary.component.html',
  styleUrls: ['./ec-summary.component.scss']
})
export class EcSummaryComponent implements OnInit {

  mode : string;
  buttonSave: boolean = false;

  @Input() stepper: MatStepper;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,

  ) { 
    this.mode = this._activatedRoute.snapshot.data.mode;
  }

  ngOnInit() {
  }

  next() {
    this.buttonSave = true;

  }

  exit() {
    this.router.navigate(['/etl_configuration']);

  }

}
