import {Component, OnInit} from '@angular/core';
import {RegionResponse} from '../../../shared/model/Region';
import {RegionService} from "../../../shared/services/region.service";
import {Observable} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {

  first = 0;
  totalRecords = 0;
  pageSize = 25;
  regions$: Observable<RegionResponse[]> = this.regionService.GetAll();

  constructor(
    private regionService: RegionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  changeStatus(region: RegionResponse): void {
    this.confirmationService.confirm({
      key: 'confirmCancel',
      message: `Deseja realmente ${region.active ? 'inativar' : 'ativar'} a região ${region.nome}?`,
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      header: 'Confirmação',
      icon: 'bx bx-info-circle',
      accept: () => {
        this.regionService.ChangeStatus(region.id).subscribe({
          next: _ => region.active = !region.active,
          error: _ => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao inativar a região'}),
          complete: () => this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Região ${region.active ? 'ativada' : 'inativada'} com sucesso!`})
        });
      }
    });

  }

}
