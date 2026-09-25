import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  usuario;
  url;
  recargar = false;

  constructor(public toastController: ToastController, private http: HttpClient, private router:
    Router, private route: ActivatedRoute,) {
    this.usuario = JSON.parse('{}');
    //Listen 172.20.10.4:80
    //this.url = 'http://192.168.1.33:80';
    this.url = 'https://mmsbargril.website';


  }

  async presentToast(c, msg) {
    const toast = await this.toastController.create({
      color: c,
      duration: 2000,
      message: msg,
      position: 'middle',
    });

    await toast.present();
  }
  setUsuario(user) {
    this.usuario = user[0];

  }
  getUsuario() {
    console.log(this.usuario);

    return this.usuario;
  }
  leerMesas() {
    return this.http.get(this.url + '/proyectoDAW/datosComandas.php');
  }
  mostrarDatosUsuario(data) {
    return this.http.post(this.url + '/proyectoDAW/mostrarDatoUsuario.php', data);

  }
  leerBebida() {
    return this.http.get(this.url + '/proyectoDAW/datosbebidas.php');
  }
  leerPlatos() {
    return this.http.get(this.url + '/proyectoDAW/datosPlatos.php');
  }
  leerIngredientes() {
    return this.http.get(this.url + '/proyectoDAW/datosIngredientes.php');
  }

  anadirIngrediente(nombre) {
    return this.http.post(this.url + '/proyectoDAW/nuevoIngrediente.php', [nombre]);

  }
  anadir(datos) {
    return this.http.post(this.url + '/proyectoDAW/nuevoPlato.php', datos);

  }
  modificarPlatos(datos) {
    return this.http.post(this.url + '/proyectoDAW/modificarPlatos.php', datos);

  }
  modificarIngrediente(datos) {
    return this.http.post(this.url + '/proyectoDAW/modificarIngrediente.php', datos);

  }
  datosUsuarios() {
    return this.http.get(this.url + '/proyectoDAW/datosUsuarios.php');
  }
  modificarUsuSelec(datos) {
    return this.http.post(this.url + '/proyectoDAW/modificarUsuSelec.php', datos);
  }
  pagado(datos) {
    return this.http.post(this.url + '/proyectoDAW/pagado.php', datos);
  }
  datosClientes() {
    return this.http.get(this.url + '/proyectoDAW/datosClientes.php');
  }
  modificarCliente(data) {
    return this.http.post(this.url + '/proyectoDAW/modificarCliente.php', data);
  }
  modificarUsuario(data) {
    return this.http.post(this.url + '/proyectoDAW/modificarUsuario.php', data);
  }
  nuevoUsuario(data) {
    return this.http.post(this.url + '/proyectoDAW/nuevoUsuario.php', data);
  };
  datosHistorial() {
    return this.http.get(this.url + '/proyectoDAW/datosHistorial.php');
  }
  modObser(data) {
    return this.http.post(this.url + '/proyectoDAW/modificarObser.php', data);
  }

  guardarComanda(data, ocupantes) {
    return this.http.post(this.url + '/proyectoDAW/guardarComanda.php', [data, ocupantes]);
  }
  trunc(x, posiciones = 0) {
    const s = x.toString();
    const l = s.length;
    const decimalLength = s.indexOf('.') + 1;

    if (l - decimalLength <= posiciones) {
      return x;
    }
    // Parte decimal del número
    const isNeg = x < 0;
    const decimal = x % 1;
    const entera = isNeg ? Math.ceil(x) : Math.floor(x);
    // Parte decimal como número entero
    // Ejemplo: parte decimal = 0.77
    // decimalFormated = 0.77 * (10^posiciones)
    // si posiciones es 2 ==> 0.77 * 100
    // si posiciones es 3 ==> 0.77 * 1000
    const decimalFormated = Math.floor(
      Math.abs(decimal) * Math.pow(10, posiciones)
    );
    // Sustraemos del número original la parte decimal
    // y le sumamos la parte decimal que hemos formateado
    const finalNum = entera + ((decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1));

    return finalNum;
  }
  formatoFecha1(a) {
    const fecha = a.split('/');
    return fecha[2] + '-' + fecha[1] + '-' + fecha[0];

  }
  formatoFecha2(a) {
    const fecha = a.split('-');
    return fecha[2] + '/' + fecha[1] + '/' + fecha[0];

  }
}
