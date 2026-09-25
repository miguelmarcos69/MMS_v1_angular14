import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AppServiceService } from '../../../services/app-service.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  mesas: any;
  usuarios: any;
  usuSelect;
  constructor(public appservice: AppServiceService) {
    this.usuSelect = JSON.parse('{}');
    this.usuarios = JSON.parse('{}');
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.appservice.leerMesas().subscribe((res) => {
      this.mesas = res;
    });
    this.appservice.datosUsuarios().subscribe((res) => {
      this.usuarios = res;
    });


  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.appservice.modificarUsuSelec(this.usuSelect).subscribe((res: any) => {
        if (res.valido) {
          this.usuSelect = {};
          this.load();
          this.appservice.presentToast('success', 'Se ha modificado correctamente');
        }
      });
    }
  }
}
