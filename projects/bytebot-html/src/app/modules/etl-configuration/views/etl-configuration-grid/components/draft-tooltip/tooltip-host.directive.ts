import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[tooltip-host]',
  })
  export class ToolTipDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
  }