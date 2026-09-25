import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComandasService } from '../../../services/comandas.service';
@Component({
  selector: 'app-comanda-modal',
  templateUrl: './comanda-modal.component.html',
  styleUrls: ['./comanda-modal.component.scss'],
})
export class ComandaModalComponent implements OnInit {
  @Input() data: any;
  platos: any;

  constructor(
    private modalCtr: ModalController,
    private comandasService: ComandasService
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.load();
  }
  load() {
    this.comandasService.leerPlatos().subscribe((res) => {
      this.platos = res;
      console.log(this.platos);

    });
  }

  async close() {
    await this.modalCtr.dismiss();
    return this.comandasService.datosMesa;
  }

  anadir(a){
    this.comandasService.datosMesa.push(a);
    console.log(a);

  }
}
