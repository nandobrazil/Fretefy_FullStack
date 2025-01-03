import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {PagesComponent} from './modules/pages/pages.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    data: {breadcrumb: 'Painel'},
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        data: {breadcrumb: 'Home'},
        component: HomeComponent
      },
      {
        path: 'region',
        data: {breadcrumb: 'Regiões'},
        loadChildren: () => import('./modules/region/region.module').then(m => m.RegionModule)
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
