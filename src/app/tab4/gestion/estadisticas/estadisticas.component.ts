import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { AppServiceService } from 'src/app/services/app-service.service';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  /***/

  /***/

  datos: any;
  pieChartLabels: (string | string[])[];
  pieChartDatasets: { data: number[] }[];
  pieChartLegend: boolean;
  pieChartPlugins: any[];
  barChartLegend: boolean;
  barChartData: { labels: string[]; datasets: { data: any; label: string }[] };
  barChartPlugins: any[];
  barChartOptions: { responsive: boolean };
  usuarios: any;
  lineChartData: {
    labels: string[];
    datasets: { data: number[]; label: string; fill: boolean; tension: number; borderColor: string; backgroundColor: string }[];
  };
  lineChartOptions: { responsive: boolean };
  lineChartLegend: boolean;

  constructor(private appService: AppServiceService) {

    this.datos = JSON.parse('{}');
  }

  ngOnInit() {
    this.load();
  }
  async load() {


    await this.appService.datosUsuarios().subscribe((res2: any) => {
      this.usuarios = res2;


    });
    await this.appService.datosHistorial().subscribe((res: any) => {
      this.datos = res;
      console.log(this.datos);


      this.calculaPlatoMasVendido();
      this.calculaMejoresVentasDia();
      this.linechar();

    });

  };

  calculaPlatoMasVendido() {
    const arrayPlatos = [];
    for (const m of this.datos) {
      for (const platos of m.platos) {
        //si esta en el array
        if (this.complobarRepetido(arrayPlatos, platos.id, 'id')) {
          for (const i of arrayPlatos) {
            if (i.id === platos.id) {

              i.cantidad = i.cantidad + 1;
            }
          }
        } else {
          platos.cantidad = 1;
          arrayPlatos.push(platos);

        }

      }


    }
    this.mostrarPie(arrayPlatos);


  }
  complobarRepetido(array, id, indice = '') {
    let retorno = false;


    if (indice !== '') {

      for (const arr of array) {
        if (arr[indice] === id) {
          retorno = true;
        }
      }
    } else {
      for (const arr of array) {
        if (arr === id) {
          retorno = true;
        }
      }
    }
    return retorno;

  }

  complobarRepetido3(array, id, indice, i) {
    let retorno = false;
    for (const arr of array) {
      if (arr[indice] === id) {
        retorno = true;
      }
    }
    return retorno;

  }
  complobarRepetido2(array, id, indice, i) {
    let retorno = false;
    for (const arr of array) {
      for (const a of arr) {



        if (a[indice] === id) {
          retorno = true;
        }
      }
    }

    return retorno;

  }


  mostrarPie(arrayPlatos) {

    this.pieChartLabels = [arrayPlatos[0].nombrePlato, arrayPlatos[1].nombrePlato, arrayPlatos[2].nombrePlato];
    this.pieChartDatasets = [{
      data: [arrayPlatos[0].cantidad, arrayPlatos[1].cantidad, arrayPlatos[2].cantidad]
    }];
    this.pieChartLegend = true;
    this.pieChartPlugins = [];

  }
  calculaMejoresVentasDia() {

    const arrayFecha = [];
    let indice = -1;
    console.log(this.datos);

    for (const fec of this.datos) {
      //si esta en el array
      if (this.complobarRepetido2(arrayFecha, fec.dia, 'dia', indice)) {


        arrayFecha[indice].push(fec);


      } else {
        //arrayFecha[indice] = [fec];
        arrayFecha.push([fec]);
        indice++;
      }
    }

    this.mostrarbarras(arrayFecha);
    /*

       */
  }
  async mostrarbarras(d) {
    const arrayTrab = [];
    const datos = d.slice(d.length - 3);

    let contador = 0;


    for await (const dias of datos) {
      arrayTrab[contador] = [];
      for await (const dia of dias) {

        if (this.complobarRepetido(arrayTrab[contador], dia.usuPagado.id, 'id')) {
          //si existen
          for (const trab of arrayTrab[contador]) {
            if (trab.id === dia.usuPagado.id) {
              trab.cantidad++;

            }

          }

        } else {
          dia.usuPagado.cantidad = 1;
          arrayTrab[contador].push(dia.usuPagado);
        }

      }

      contador++;

    }
    //añadir con cantidad 0
    for (const i of arrayTrab) {


    }





    contador = 0;
    this.barChartData = {
      labels: [],
      datasets: []
    };
    for (const dat of datos) {
      for (const a of dat) {
        if (!this.complobarRepetido(this.barChartData.labels, a.dia)) {
          this.barChartData.labels.push(a.dia);

        }


      }
      contador++;
    }
    contador = 0;
    for (const usu of this.usuarios) {
      for (const arr of arrayTrab) {

        if (!this.complobarRepetido(arr, usu.id, 'id')) {
          usu.cantidad = 0;
          arr.push(usu);

        }

      }
    }

    contador = 0;
    for (const dia of arrayTrab) {
      for (const trab of dia) {

        if (!this.complobarRepetido3(this.barChartData.datasets, trab.nombre, 'label', contador)) {
          this.barChartData.datasets.push({ data: [trab.cantidad], label: trab.nombre });
        } else {
          for (const iterator of this.barChartData.datasets) {
            if (iterator.label === trab.nombre) {
              iterator.data.push(trab.cantidad);
            }
          }
        }
      }
      contador++;
    }
    this.barChartLegend = true;
    this.barChartPlugins = [];

    this.barChartOptions = {
      responsive: false,
    };
  }

  linechar() {

    const arrayFecha = [];
    const arrayprecio = [];
    let indice = -1;
    for (const fec of this.datos) {
      //si esta en el array
      if (this.complobarRepetido2(arrayFecha, fec.dia, 'dia', indice)) {


        arrayFecha[indice].push(fec);


      } else {
        //arrayFecha[indice] = [fec];
        arrayFecha.push([fec]);
        indice++;
      }
    }
    let contador = 0;
    for (const dia of arrayFecha) {
      let precio = 0;
      let d = '';
      for (const i of dia) {
        precio = precio + parseFloat(i.precioTotal);
        d = i.dia;
      }
      arrayprecio.push({
        dia: d,
        prec: precio
      });
      contador++;
    }

    this.mostrarLinechar(arrayprecio);
  }


  mostrarLinechar(d) {
    const datos = d.slice(d.length - 3);
    this.lineChartData = {

      labels: [],
      datasets: [
        {
          data: [],
          label: 'Valor en euros',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(204,204,0,0.5)'
        }
      ]
    };

    for (const dat of datos) {
      this.lineChartData.labels.push(dat.dia);
      this.lineChartData.datasets[0].data.push(dat.prec);
    }

    this.lineChartOptions = {
      responsive: false
    };
    this.lineChartLegend = true;
  }
}

