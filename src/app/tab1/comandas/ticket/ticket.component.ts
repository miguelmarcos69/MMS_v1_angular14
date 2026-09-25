import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AnadirComponent } from '../anadir/anadir.component';
import { ComandasModule } from '../comandas.module';
import { ComandasComponent } from '../comandas/comandas.component';
import { format, parseISO } from 'date-fns';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  @ViewChild(ComandasComponent) child;
  @Output() messageEvent = new EventEmitter<string>();

  id: string;
  mostrar;
  mesa: any;
  bebida: any;
  platos: any;
  total: any;
  usuario: any;
  dia: any;
  mesas: any;
  iva: number;
  constructor(private route: ActivatedRoute,
    private appService: AppServiceService,
    private router: Router,
    private socket: SocketService
  ) {
    this.mesa = JSON.parse('{}');
    this.id = this.route.snapshot.paramMap.get('id');
    this.mostrar = false;
    this.bebida = [];
    this.platos = [];


  }


  ngOnInit() {
    setTimeout(this.carga, 5000);

    this.load();
  }

  carga() {
    document.getElementById('load').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';

  }
  load() {
    this.appService.leerMesas().subscribe((res) => {
      let cont = 0;
      this.mesa = res;
      this.mesa.forEach(element => {
        if (element.id === this.id) {
          this.mesa = res[cont];
          //colocacion de platos

          for (const p of this.mesa.platos) {
            const objeto = {
              id: p.id,
              nombre: p.nombrePlato,
              precio: p.precio,
              cantidad: 1,
            };

            if (this.platos.length === 0) {
              this.platos.push(objeto);

            } else {
              if (!this.comprobar(this.platos, objeto)) {

                this.platos.push(objeto);
              } else {
                this.platos.forEach(i => {
                  if (i.id === objeto.id) {
                    i.cantidad = i.cantidad + 1;

                  }
                });
              }


            }

          }
          //colocacion de bebidas
          for (const b of this.mesa.bebida) {
            const objeto = {
              id: b.id,
              nombre: b.nombre,
              precio: b.precio,
              cantidad: 1,
            };
            if (this.bebida.length === 0) {
              this.bebida.push(objeto);

            } else {
              if (!this.comprobar(this.bebida, objeto)) {

                this.bebida.push(objeto);
              } else {
                this.bebida.forEach(i => {
                  if (i.id === objeto.id) {
                    i.cantidad = i.cantidad + 1;

                  }
                });
              }


            }

          }
          console.log(this.mesa);
          console.log(this.mesa.precioTotal);
          const num = parseFloat(this.mesa.precioTotal) * 0.10;
          this.iva = parseFloat(num.toFixed(2));
          this.total = this.appService.trunc(parseFloat(this.mesa.precioTotal) + this.iva, 2);
          return false;

        }
        cont++;
      });

    });

    this.usuario = this.appService.getUsuario();
    console.log(this.usuario);
    const date = new Date();
    this.dia = format(new Date(), 'dd/MM/yyyy');

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
  pagado() {
    this.mesa.dia = this.dia;
    this.mesa.usuPa = this.usuario.id;
    this.appService.pagado(this.mesa).subscribe((res: any) => {
      console.log(this.mesa);
      if (res.valido) {
        window.navigator.vibrate([200]);
        if (this.mesa.accion === null) {
          this.socket.emitEvent({
            usuario: this.usuario.nombre, accion: 'pagadoMesa',
            data: {
              idMesa: this.mesa.nombreMesa,

            }


          });
        } else {
          this.socket.emitEvent({
            usuario: this.usuario.nombre, accion: 'pagado',
            data: {
              nombre: this.mesa.nombre,
              apellidos: this.mesa.apellidos


            }


          });
        }

        this.appService.presentToast('success', 'Se ha pagado correctamente');
        window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab1';

      }

    });

  }

}
