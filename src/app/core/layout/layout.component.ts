import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|it/) ? browserLang : 'en');		
  }
  ngOnInit(){

  }
}
