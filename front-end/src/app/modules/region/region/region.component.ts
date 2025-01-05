import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegionService} from '../../../shared/services/region.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {City} from '../../../shared/model/City';
import {CityService} from '../../../shared/services/city.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  form: FormGroup;
  cityOptions: SelectItem[] = [];
  cities: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private regionService: RegionService,
    private confirmationService: ConfirmationService,
    private cityService: CityService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      city: [null],
      active: [true],
      nome: [null, [Validators.required, Validators.minLength]],
      cidades: [null, Validators.required]
    });

    this.cityService.GetAll().subscribe(cities => {
      this.cityOptions = cities
      .filter(city => !city.regiaoId)
        .map(city => {
        return {
          label: `${city.nome} - ${city.uf}`,
          value: city
        };
      });
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.regionService.GetById(id).subscribe(region => {
          this.form.patchValue(region);
          this.cities = region.cidades;
        });
      }
    });
  }

  addCity(): void {
    const city = this.form.get('city').value;
    if (!city) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'Selecione uma cidade'});
      return;
    }

    if (this.cities.some(c => c.id === city.id)) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'Cidade já adicionada'});
      return;
    }
    this.form.get('city').reset();
    this.cities.push(city);
    this.form.get('cidades').setValue(this.cities);
  }

  removeCity(city: City): void {
    this.confirmationService.confirm({
      key: 'confirmCancel',
      message: `Confirma a remoção da cidade: ${city.nome}?`,
      acceptLabel: 'Confirmar',
      acceptIcon: 'bx bx-check',
      rejectLabel: 'Cancelar',
      rejectIcon: 'bx bx-x',
      header: 'Confirmação',
      icon: 'bx bx-info-circle',
      accept: () => {
        this.cities = this.cities.filter(c => c.id !== city.id);
        this.form.get('cidades').setValue(this.cities);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos'});
      return;
    }

    const { value } = this.form;
    const region = {
      id: value?.id || undefined,
      nome: value.nome,
      active: true,
      cidades: value.cidades?.map((city: City) => city.id)
    };

    if (region.id) {
      this.regionService.Put(region).subscribe(_ => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro atualizado com sucesso'});
        this.cancel();
      });
      return;
    }
    this.regionService.Post(region).subscribe(_ => {
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso'});
      this.cancel();
    });
  }

  cancel(): void {
    this.form.reset();
    this.cities = [];
    this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then();
  }

}
