import { Component, Input, Output, EventEmitter } from '@angular/core';
import {dateDiffInDays, formatDate, IdbService} from './../../core/services';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'campaigns-table',
  templateUrl: './campaign-table.component.html',
  styleUrls: ['./campaign-table.component.scss']
})
export class CampaignsTableComponent {
	@Input() data: any;
	@Input() activeTab: any;
	@Output() pricingClick = new EventEmitter();
	formatDate:any;
  constructor(
		private IdbService: IdbService,
		private _snackBar: MatSnackBar
	) {		
		this.formatDate = formatDate;
  }
	getDayDiff(date){
		const diffDays = dateDiffInDays(date, new Date());
		if(diffDays < 0){
			return `${Math.abs(diffDays)} Days ago`;
		} 
		else if(diffDays > 0){
				return `${Math.abs(diffDays)} Days Ahead`;
		}
		else {
				return 'Today';
		}
	}
	showPricing(campaign){
		this.pricingClick.emit(campaign);
	}
	rescheduleCampaign(event, campaign, index){
		const timestamp = event.target.value;
		const updatedCampaign = {...campaign, createdOn: timestamp};
		this.IdbService.reScheduleCampaign(updatedCampaign, this.data, this.activeTab, index).then(()=>{
			this.openSnackBar('Campaign rescheduled successfully');
		});
	}
	openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
