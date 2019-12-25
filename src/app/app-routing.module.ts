import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren:'./campaigns/campaigns.module#CampaignsModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo:'/'
  }
];
// { preloadingStrategy: PreloadAllModules } --- prefetching lazy modules in the background. i havn't put a lazy loaded module since this a single page demo
@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
