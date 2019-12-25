import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'campaigns-pricing-modal',
  templateUrl: './campaign-pricing-modal.html',
  styleUrls: ['./campaign-pricing-modal.scss']
})
export class CampaignsPricingModal implements OnChanges {
  @Input() campaignData: any;
  @Input() showModal: boolean;
  @Output() modalClose = new EventEmitter();
  onBeforeClose:boolean;
  constructor() {
  }
  ngOnChanges(changes:SimpleChanges){
    // const visibilityChange = changes.showModal;
    // if (typeof visibilityChange !== "undefined" && !visibilityChange.firstChange) {
    //   console.log(visibilityChange,'ggggggggggggggggggggg')
    //   this.showModal = visibilityChange.currentValue;
    // }
  }
  closeModal(){
    this.onBeforeClose = true;
    setTimeout(()=>{
      this.modalClose.emit();
      this.onBeforeClose = false;
    },300);
  }
  
}
