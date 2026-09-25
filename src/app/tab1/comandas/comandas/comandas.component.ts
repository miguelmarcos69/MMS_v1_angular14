import { AfterContentInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';


import { LoginService } from 'src/app/services/login.service';
import { ComandasService } from '../../../services/comandas.service';
import { AppServiceService } from 'src/app/services/app-service.service';

import { OverlayEventDetail } from '@ionic/core/components';
import { LocalNotifications } from '@capacitor/local-notifications';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.scss'],
})

export class ComandasComponent implements OnInit, AfterContentInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() usuario: any;

  obs;
  mesas;
  platos: any;
  url: string;
  message: string;
  segment: any;
  usuarios;;
  constructor(public applogin: LoginService, private comandasService: ComandasService,
    private router: Router, private route: ActivatedRoute,
    public appservice: AppServiceService, public modalCtrl: ModalController, private socket: SocketService
  ) {
    console.log(socket);
    this.url = this.appservice.url;
    this.usuario = this.appservice.usuario;
    this.usuario = JSON.parse('{}');
    this.usuarios = JSON.parse('{}');
    this.segment = 'mesas';
    socket.callback.subscribe(res => {
      //observacionees
      if (res === 'actualizacion') {
        this.notificacionesObs();

      } else {
        this.notificaciones(res);

      }

      this.load2();

    });


  }
  ngAfterContentInit(): void {
    this.cargarUsuario();
  }

  async ngOnInit() {


    await LocalNotifications.requestPermissions();
    this.load2();
    this.datosUsuarios();


  }
  async notificaciones(obj) {
    console.log('notificacion');
    if (obj.accion === 'llevar') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Actualización de pedido',
            body: 'El usuario ' + obj.usuario + ' a actualizado el pedido para ' +
              obj.data.datosPersona.nombre + ' ' + obj.data.datosPersona.apellidos +
              'dirección: ' + obj.data.datosPersona.direccion,
            id: 2,
            extra: {
              data: 'Actualiza'
            },
            iconColor: '#FFFF00'
          }
        ]
      });
    }
    if (obj.accion === 'domi') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Actualización de pedido para llevar',
            body: 'El usuario ' + obj.usuario + ' a actualizado el pedido para ' +
              obj.data.datosPersona.nombre + ' ' + obj.data.datosPersona.apellidos,
            id: 3,
            extra: {
              data: 'Actualiza'
            },
            iconColor: '#FFFF00'
          }
        ]
      });
    }
    if (obj.accion === 'comanda') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Actualización de pedido',
            body: 'El usuario ' + obj.usuario + ' a actualizado la mesa ' +
              obj.data.nombreMesa,
            id: 4,
            extra: {
              data: 'Actualiza'
            },
            iconColor: '#FFFF00'
          }
        ]
      });
    }
    if (obj.accion === 'pagadoMesa') {

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Pedido finalizado',
            body: 'El usuario ' + obj.usuario + ' a finalizado el pedido de la mesa ' +
              obj.data.nombreMesa,
            id: 5,
            extra: {
              data: 'Actualiza'
            },
            iconColor: '#FFFF00'
          }
        ]
      });
    }
    if (obj.accion === 'pagado') {

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Pedido finalizado',
            body: 'El usuario ' + obj.usuario + ' a finalizado el pedido para ' +
              obj.data.nombre + '' + obj.data.apellidos,
            id: 6,
            extra: {
              data: 'Actualiza'
            },
            iconColor: '#FFFF00'
          }
        ]
      });
    }

  }
  async notificacionesObs() {
    console.log('notificacion Observaciones');
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Tienes nuevas Observaciones',
          body: 'El administrador te ha asignado nuevas funciones para realizar',
          id: 1,
          extra: {
            data: 'Actualiza'
          },
          iconColor: '#FFFF00'
        }
      ]
    });
  }


  async load2() {

    await this.appservice.leerMesas().subscribe((res) => {
      this.mesas = res;
      console.log(this.mesas);

      this.convertirPlatos();
    });
  }

  convertirPlatos() {
    this.appservice.leerPlatos().subscribe((res) => {
      this.platos = res;
      /*
      for (const key in this.mesas) {
        if (Object.prototype.hasOwnProperty.call(this.mesas, key)) {
          const element = this.mesas[key].platos;
          for (const key2 in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
              for (const key3 in this.platos) {

                if (Object.prototype.hasOwnProperty.call(this.platos, key3)) {
                  const plato = this.platos[key3];
                  if (element[key2] === plato.id) {
                    element[key2] = plato.nombrePlato;
                  }
                }
              }
            }
          }
        }
      }
      for (const key in this.mesas) {
        if (Object.prototype.hasOwnProperty.call(this.mesas, key)) {
          const element = this.mesas[key].platos;
          for (const key2 in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
              for (const key3 in this.platos) {

                if (Object.prototype.hasOwnProperty.call(this.platos, key3)) {
                  const plato = this.platos[key3];
                  if (element[key2] === plato.id) {
                    element[key2] = plato.nombrePlato;
                  }
                }
              }
            }
          }
        }
      }*/
    });
    this.cargarUsuario();
  }

  datosUsuarios() {
    this.appservice.datosUsuarios().subscribe((res) => {
      this.usuarios = res;
      console.log(this.usuarios);

    });
  }

  async load3(a, opc) {
    console.log(a);
    a.llevar = opc;

    this.comandasService.datosMesa = a;;

    this.router.navigate(['mesa'], { relativeTo: this.route });
  }
  async login() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }



  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.load2();
      this.cargarUsuario();
      event.target.complete();
    }, 2000);
  };
  cargarUsuario() {
    this.usuario = this.appservice.usuario;
    console.log('usuario cargad');

  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.appservice.modObser(this.usuarios).subscribe((res) => {
      // this.usuarios = res;
      console.log(this.usuarios);

    });
    console.log('avdf');
    this.socket.emitEvent('actualizacion');

    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  llevar() {
    this.router.navigate(['llevar'], { relativeTo: this.route });

  }
  domicilio() {
    this.router.navigate(['domicilio'], { relativeTo: this.route });
  }

  segmentChanged(a) {
    console.log(a.detail.value);
    this.segment = a.detail.value;

  }

}
