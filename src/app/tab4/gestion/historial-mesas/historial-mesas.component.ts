import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-historial-mesas',
  templateUrl: './historial-mesas.component.html',
  styleUrls: ['./historial-mesas.component.scss'],
})
export class HistorialMesasComponent implements OnInit {
  datos: any;
  id: any;
  platos: any;
  bebida: any;
  iva: number;
  total: any;
  segment: any;
  busqueda: any;
  showPicker: boolean;
  dateValue: any;
  fecha: string;

  constructor(public appService: AppServiceService) {
    //this.datos = JSON.parse('{}');
    //this.bebida = [];
    this.platos = [];
    this.segment = 'mesas';
    this.showPicker = false;
    this.dateValue = format(new Date(), 'yyyy-MM-dd');
    this.fecha = this.appService.formatoFecha2(this.dateValue);
    console.log(this.fecha);


  }

  ngOnInit() {
    this.load();
  }
  load() {
    this.appService.datosHistorial().subscribe((res: any) => {
      this.datos = res;
    });
  }
  segmentChanged(a) {
    console.log(a.detail.value);
    this.segment = a.detail.value;

  }
  dateChange(fecha) {

    this.dateValue = fecha;
    this.fecha = this.appService.formatoFecha2(fecha);

    this.showPicker = false;
  }


  onSearchChange(evento) {
    this.busqueda = [];
    const ev = evento.detail.value;
    console.log(ev);
    console.log(this.datos);
    let i = 0;
    this.datos.forEach(element => {
      if (element.numTel.substr(0, ev.length) === ev) {
        this.busqueda[i] = element;
        i++;
      }
      console.log(element.nombreMesa.substr(0, ev.length).toLowerCase());

      if (element.nombreMesa.substr(0, ev.length).toLowerCase() === ev) {
        this.busqueda[i] = element;
        i++;
      }


    });
    if (ev === '') {
      this.busqueda = '';

    }

  }
  comprobar(array, nombre) {
    ;
    let retorno = false;

    for (const b2 of array) {
      if (nombre.id === b2.id) {
        retorno = true;
      }

    }
    return retorno;
  }
}
