import {Component, OnInit} from '@angular/core';
import {RegionResponse} from '../../../shared/model/Region';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {

  first = 0;
  totalRecords = 0;
  pageSize = 25;
  last = 0;
  regions: RegionResponse[] = [
    {id: 1, name: 'Teste'},
    {id: 2, name: 'Teste'},
    {id: 3, name: 'Teste'},
    {id: 4, name: 'Teste'},
    {id: 5, name: 'Teste'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
