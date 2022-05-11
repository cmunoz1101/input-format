import { Component, OnInit } from '@angular/core';
import { ActivateDraftPopupService } from '../../services/activate-draft-popup.service';

@Component({
  selector: 'byte-draft-tooltip',
  templateUrl: './draft-tooltip.component.html',
  styleUrls: ['./draft-tooltip.component.scss']
})
export class DraftTooltipComponent implements OnInit {

  styleTop: any;
  styleLeft: any;
  data: any;
  constructor(
    private activateDraftPopupService: ActivateDraftPopupService
  ) { }

  ngOnInit() {
  }

  onAccept(){
    this.activateDraftPopupService.loadComponent({...this.data}).subscribe(
      (data) =>{
        console.log(data)
      }
    )
  }

  

}
