import { Component, OnInit, ViewChild } from '@angular/core';
import { ComandasService } from '../../../services/comandas.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ComandaModalComponent } from '../comanda-modal/comanda-modal.component';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CheckboxCustomEvent } from '@ionic/angular';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.scss'],
})
export class AnadirComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal) modal2: IonModal;

  data;
  modalDataResponse: any;
  platos: any;
  name: any;
  color;
  ingredientes;
  ocupantes;
  url;
  usuario: any;
  guar;
  segment;
  bebida: any;
  total;
  constructor(
    private comandasService: ComandasService,
    private http: HttpClient,
    public modalCtrl: ModalController,
    public appservice: AppServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private socket: SocketService

  ) {
    this.data = this.comandasService.datosMesa;
    this.url = this.appservice.url;
    console.log(this.data);
    if (this.data.llevar) {

      this.ocupantes = this.data.ocupantes;
    } else {
      this.ocupantes = 0;

    }
    this.usuario = this.appservice.usuario;
    this.segment = 'platos';

  }

  ngOnInit() {
    console.log(this.usuario);

    this.load();
    this.generarTotal();
  }
  load() {
    this.appservice.leerPlatos().subscribe((res) => {
      this.platos = res;
      console.log(this.platos);

    });

    this.appservice.leerIngredientes().subscribe((res) => {
      this.ingredientes = res;
      console.log(this.ingredientes);

    });

    this.appservice.leerBebida().subscribe((res) => {
      this.bebida = res;
      console.log(this.bebida);

    });
  }
  async anadir(a) {
    console.log(a);
    const colorcard = document.getElementById(a.id);
    colorcard.style.backgroundColor = 'red';
    if (this.data.platos === '' || this.data.platos === null) {
      this.data.platos = [{
        id: a.id,
        nombrePlato: a.nombrePlato,
        ingredientes: a.ingredientes,
        img: a.img,
        precio: a.precio
      }];
    } else {
      this.data.platos.push(a);

    }
    this.generarTotal();
    this.appservice.presentToast('success', 'Se ha añadido: ' + a.nombrePlato);

  }
  async anadirb(a) {





    const colorcard = document.getElementById(a.id);
    colorcard.style.backgroundColor = 'red';
    if (this.data.bebida === '' || this.data.bebida === null) {
      this.data.bebida = [{
        id: a.id,
        nombre: a.nombre,
        img: a.img,
        precio: a.precio
      }];
    } else {
      this.data.bebida.push(a);

    }
    this.generarTotal();
    this.appservice.presentToast('success', 'Se ha añadido: ' + a.nombre);

  }
  eliminar(a, i) {
    window.navigator.vibrate([200]);
    const colorcard = document.getElementById(a.id);
    //colorcard.style.backgroundColor = 'blue';
    this.data.platos.splice(i, i + 1);
    if (this.data.accion === 'domi') {
      this.guardarDomi();
    }
    if (this.data.accion === 'llevar') {
      this.guardarLlevar();
    }
    if (this.data.accion === null) {
      this.guardar();
    }
    this.generarTotal();

  }
  eliminarBebida(a, i) {
    window.navigator.vibrate([200]);

    this.data.bebida.splice(i, i + 1);

    if (this.data.accion === 'domi') {
      this.guardarDomi();
    }
    if (this.data.accion === 'llevar') {
      this.guardarLlevar();
    }
    if (this.data.accion === null) {
      this.guardar();
    }    ;
    this.generarTotal();

  }


  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.load();
      event.target.complete();
    }, 2000);
  };

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  cancel2() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }
  confirm2() {
    console.log(this.data.accion);

    if (this.data.accion === 'domi') {
      this.guardarDomi();
    }
    if (this.data.accion === 'llevar') {
      this.guardarLlevar();
    }
    if (this.data.accion === null) {
      this.guardar();
    }
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  guardar() {
    this.data.precioTotal = this.total;
    console.log(this.data);

    this.appservice.guardarComanda(this.data, this.ocupantes).subscribe((res) => {
      this.guar = res;
      if (this.guar.valido) {
        this.appservice.presentToast('success', ('Se han guardado correctamente los cambios'));
        this.socket.emitEvent({
          usuario: this.usuario.nombre, accion: 'comanda',
          data: {
            idMesa: this.data.id,
            nombreMesa: this.data.nombreMesa
          }
        });
        window.navigator.vibrate([200]);

      } else {

        this.appservice.presentToast('danger', ('Error al guardar los datos'));
      }
    });

  }
  guardarLlevar() {
    this.socket.emitEvent('actualizacion');
    this.data.precioTotal = this.total;
    this.appservice.guardarComanda(this.data, 'llevar').subscribe((res) => {
      this.guar = res;
      console.log(this.data);

      if (this.guar.valido) {
        this.appservice.presentToast('success', ('Se han guardado correctamente los cambios'));
        this.socket.emitEvent({
          usuario: this.usuario.nombre, accion: 'llevar',
          data: {
            idMesa: this.data.id,
            tlfn: this.data.numTel,
            datosPersona: {
              nombre: this.data.nombre,
              apellidos: this.data.apellidos,
              direccion: this.data.direccion,

            }


          }
        });

      } else {

        this.appservice.presentToast('danger', ('Error al guardar los datos'));
      }
    });

  }

  guardarDomi() {
    this.socket.emitEvent('actualizacion');
    this.data.precioTotal = this.total;
    this.appservice.guardarComanda(this.data, 'domi').subscribe((res) => {
      this.guar = res;
      console.log(this.data);

      if (this.guar.valido) {
        this.appservice.presentToast('success', ('Se han guardado correctamente los cambios'));
        this.socket.emitEvent({
          usuario: this.usuario.nombre, accion: 'domi',
          data: {
            idMesa: this.data.id,
            tlfn: this.data.numTel,
            datosPersona: {
              nombre: this.data.nombre,
              apellidos: this.data.apellidos,
              direccion: this.data.direccion,

            }


          }
        });
      } else {

        this.appservice.presentToast('danger', ('Error al guardar los datos'));
      }
    });

  }
  segmentChanged(a) {
    console.log(a.detail.value);
    this.segment = a.detail.value;

  }

  generarTotal() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    let total = 0.0;
    console.log(this.data.platos !== '' && this.data.platos !== null);
    console.log(this.data.bebida !== '' && this.data.bebida !== null);

    if (this.data.platos !== '' && this.data.platos !== null) {

      for (const iterator of this.data.platos) {
        total = total + parseFloat(iterator.precio);
      }
    }

    if (this.data.bebida !== '' && this.data.bebida !== null) {
      for (const iterator of this.data.bebida) {
        total = total + parseFloat(iterator.precio);
      }
    }
    this.total = total.toFixed(2);
    console.log(this.total);


  }
  ticket() {
    if (this.data.accion === 'domi') {
      this.guardarDomi();
    }
    if (this.data.accion === 'llevar') {
      this.guardarLlevar();
    }
    if (this.data.accion === null) {
      this.guardar();
    }
    this.router.navigate(['ticket', this.data.id], { relativeTo: this.route });

  }
}
