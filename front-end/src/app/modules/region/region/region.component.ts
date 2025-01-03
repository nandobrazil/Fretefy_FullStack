import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RegionService} from '../../../shared/services/region.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  form: FormGroup;
  cityOptions: SelectItem[] = [];
  cities: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private regionService: RegionService,
    private cityService: RegionService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      city: [null],
      name: [null, [Validators.required, Validators.minLength]],
      cities: [null, Validators.required]
    });
  }

}
