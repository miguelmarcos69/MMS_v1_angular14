import { Component, Output } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  @Output() usuario: any;

  constructor(private appService: AppServiceService,) {
    this.usuario = this.appService.usuario;
    console.log(this.usuario);
  }
}
