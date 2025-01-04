import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionComponent} from './region/region.component';
import {RegionRoutingModule} from './region.routing';
import {RegionsComponent} from './regions/regions.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RegionRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TooltipModule
  ],
  declarations: [RegionComponent, RegionsComponent],
  exports: [RegionComponent]
})
export class RegionModule {
}
