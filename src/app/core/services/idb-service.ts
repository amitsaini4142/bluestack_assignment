import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, Subject } from 'rxjs';
import pastCampaignData from './../../../assets/mock-data/past.json';
import upcomingCampaignData from './../../../assets/mock-data/upcoming.json';
import liveCampaignData from './../../../assets/mock-data/live.json';
import { dateDiffInDays } from './date-service.js';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  db: any;
  store: any;
  objectStore: string = 'campaigns';
  constructor() {
    this.connectToIDB().then(db => {
      this.db = db;
    });
  }

  connectToIDB() {
    const _this = this;
    return openDB('bluestack', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!oldVersion) {
          const store = db.createObjectStore(_this.objectStore, { keyPath: 'key' });
          liveCampaignData.forEach(campaign => {
            campaign.createdOn = Date.now();
          });
          store.put({ key: 'upcoming', value: upcomingCampaignData });
          store.put({ key: 'live', value: liveCampaignData });
          store.put({ key: 'past', value: pastCampaignData });
        }

      }
    });
  }

  addItems(key: String, value: any) {
      const tx = this.db.transaction(this.objectStore, 'readwrite');
      const store = tx.objectStore(this.objectStore);
      store.put({key, value});
      return tx.complete;
  }

  deleteItems(key: String) {
      const tx = this.db.transaction(this.objectStore, 'readwrite');
      const store = tx.objectStore(this.objectStore);
      store.delete(key);
      return tx.complete;
  }

  getCampaign(key: string) {
    const _this = this;
    return new Promise((resolve,reject)=>{
      (function retry() {
        var retryInterval = 200;
        if (_this.db) {
          const tx = _this.db.transaction(_this.objectStore, 'readonly');
          const store = tx.objectStore(_this.objectStore);
          store.get(key).then(data => {
            resolve(data);
          },
          err=>{
            reject(err);
          });
        } else {
          setTimeout(function () {
            retry();
          }, retryInterval);
        }
      })();
    });
  }

  getAllData() {
      const tx = this.db.transaction(this.objectStore, 'readonly');
      const store = tx.objectStore(this.objectStore);
      return store.getAll();
  }
  updateCampaignData(campaign, data) {
      const tx = this.db.transaction(this.objectStore, 'readwrite');
      const store = tx.objectStore(this.objectStore);
      return store.put({ key: campaign, value: data });
  }
  fetchAndAddCampaign(campaign, newCampaign) {
    const tx = this.db.transaction(this.objectStore, 'readwrite');
    const store = tx.objectStore(this.objectStore);
    return store.get(campaign).then(({value})=>{
      var updatedCampaignData = [...value,newCampaign];
      return store.put({ key: campaign, value: updatedCampaignData });
    });
  }
  reScheduleCampaign(updatedCampaign,campaignData, activeCampaign, index) {
    this;
    function reschedule(){
      campaignData.splice(index, 1);
      return Promise.all([this.updateCampaignData(activeCampaign,campaignData), this.fetchAndAddCampaign(targetCampaign,updatedCampaign)]);
    }
    const diffDays = dateDiffInDays(updatedCampaign.createdOn, new Date());
    let targetCampaign;
    if(diffDays < 0){
			if(activeCampaign != 'past'){
        targetCampaign = 'past';
        return reschedule.call(this);
      }
		} 
		else if(diffDays > 0){
			if(activeCampaign != 'upcoming'){
        targetCampaign = 'upcoming';
        return reschedule.call(this);
      }
		}
		else {
      if(activeCampaign != 'live'){
        targetCampaign = 'live';
        return reschedule.call(this);
      }
    }
    return Promise.resolve();
  }

}