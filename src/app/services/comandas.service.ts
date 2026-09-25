import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Injectable({
  providedIn: 'root',
})
export class ComandasService {
  url;
  datosMesa;
  toastController: any;
  constructor(private http: HttpClient, private appService: AppServiceService) {
    this.url = this.appService.url;
  }
  leerMesas() {
    return this.http.get(this.url + '/proyectoDAW/datosComandas.php');
  }
  leerPlatos() {
    return this.http.get(this.url + '/proyectoDAW/datosPlatos.php');
  }
  leerIngredientes() {
    return this.http.get(this.url + '/proyectoDAW/datosIngredientes.php');
  }
  guardarComanda(data, ocupantes) {
    return this.http.post(this.url + '/proyectoDAW/guardarComanda.php', [data, ocupantes]);
  }
  leerBebida() {
    return this.http.get(this.url + '/proyectoDAW/datosbebidas.php');
  }
  datosUsuarios() {
    return this.http.get(this.url + '/proyectoDAW/datosUsuarios.php');
  }
  modObser(data) {
    return this.http.post(this.url + '/proyectoDAW/modificarObser.php', data);
  }

  datosClientes() {
    return this.http.get(this.url + '/proyectoDAW/datosClientes.php');
  }
  guardarCliente(data) {
    return this.http.post(this.url + '/proyectoDAW/guardarCliente.php', data);
  }


}
