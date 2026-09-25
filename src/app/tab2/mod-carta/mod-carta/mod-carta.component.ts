import { Component, OnInit, ViewChild } from '@angular/core';
import { ComandasService } from 'src/app/services/comandas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-mod-carta',
  templateUrl: './mod-carta.component.html',
  styleUrls: ['./mod-carta.component.scss'],
})
export class ModCartaComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;


  platos;
  ingredientes;
  bebida;
  segment: any;
  url;
  tipo: string;
  name;
  modificarC;
  nomSelec: any;
  ingSelec: any;
  precSelec: any;
  previsualizacion: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  };
  archivos: any;
  previsualizacion2: any;
  prev: boolean;
  prev2: boolean;

  constructor(private comandasService: ComandasService, private route: ActivatedRoute, private router: Router,
    private appService: AppServiceService) {
    this.modificarC = JSON.parse('{}');
    this.archivos = new Array();
    this.segment = 'platos';
    this.url = this.appService.url;
    this.prev2 = true;
    this.prev = false;

  }

  ngOnInit() {


    this.load();
  }

  load() {
    this.comandasService.leerPlatos().subscribe((res) => {
      this.platos = res;

      console.log(this.platos);

    });

    this.comandasService.leerIngredientes().subscribe((res) => {
      this.ingredientes = res;
      console.log(this.ingredientes);

    });

    this.comandasService.leerBebida().subscribe((res) => {
      this.bebida = res;
      console.log(this.bebida);

    });
  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.load();
      event.target.complete();
    }, 2000);
  };
  segmentChanged(a) {
    console.log(a.detail.value);
    this.segment = a.detail.value;

  }
  andirBebida() {
    this.router.navigate(['anadirCarta', 'bebida'], { relativeTo: this.route });


  }
  andirPlatos() {
    this.router.navigate(['anadirCarta', 'platos'], { relativeTo: this.route });
  }
  modificar(tipo, a) {
    this.router.navigate(['modificar', tipo, a.id], { relativeTo: this.route });

  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }


}
