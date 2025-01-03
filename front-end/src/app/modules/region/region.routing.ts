import {RouterModule, Routes} from '@angular/router';
import {RegionComponent} from './region/region.component';
import {RegionsComponent} from './regions/regions.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Listagem'},
    component: RegionsComponent
  },
  {
    path: 'new',
    data: {breadcrumb: 'Cadastrar'},
    component: RegionComponent
  },
  {
    path: ':id',
    data: {breadcrumb: 'Gerenciar'},
    component: RegionComponent
  }
];

export const RegionRoutingModule = RouterModule.forChild(routes);
