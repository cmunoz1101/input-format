import { Component, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'byte-ec-source-test',
  templateUrl: './ec-source-test.component.html',
  styleUrls: ['./ec-source-test.component.scss']
})
export class EcSourceTestComponent implements OnInit {

  mode : string;

  @Input() stepper: MatStepper;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { 
    this.mode = this._activatedRoute.snapshot.data.mode;
  }

  ngOnInit() {
  }

  next() {
    this.stepper.next();
  }

}