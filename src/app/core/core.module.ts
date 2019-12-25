import { AppRoutingModule } from './../app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService} from './services';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
  ],
  providers:[
    HttpService, 
  ]
})
export class CoreModule { }
