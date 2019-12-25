import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdbService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'campaigns-home',
  templateUrl: './campaigns-home.component.html',
  styleUrls: ['./campaigns-home.component.scss']
})
export class CampaignsHomeComponent implements OnInit {
  campaignTabs: any;
  activeTab:String;
  selectedCampaign:any;
  showModal:boolean;
  campaignData:any;
  campaignTitles:any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private IdbService: IdbService,
    public translate: TranslateService
  ) {
    translate.stream(['titles.upcomingCampaigns', 'titles.liveCampaigns', 'titles.pastCampaigns']).subscribe(res => {
      this.campaignTabs = [
        {key:'upcoming', title: res['titles.upcomingCampaigns'] },
        {key:'live', title: res['titles.liveCampaigns'] },
        {key:'past', title: res['titles.pastCampaigns'] }
      ];
    });
    this.activeTab = 'upcoming';
  }

  ngOnInit() {
    this.setActiveTabData('upcoming');
  }
  
  setCurrentTab(tab:string) {
    this.activeTab = tab;
    this.setActiveTabData(tab);
  }
  onPricingClick(campaignData){
    this.selectedCampaign = campaignData;
    this.showModal = true;
  }
  onModalClose(){
    this.showModal = false;
  }
  setActiveTabData(campaign:string) {
    this.IdbService.getCampaign(campaign).then((data:any)=>{
      this.campaignData = data.value;
    });
  }
}
