import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-mod-ingre-mod',
  templateUrl: './mod-ingre-mod.component.html',
  styleUrls: ['./mod-ingre-mod.component.scss'],
})
export class ModIngreModComponent implements OnInit {
  id: string;
  ingre: any;
  handlerMessage = '';
  roleMessage = '';
  nombreSelect: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appservice: AppServiceService,
    private alertController: AlertController
  ) {
    this.ingre = JSON.parse('{}');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.load();
  }
  load() {
    this.appservice.leerIngredientes().subscribe((res: any) => {
      this.ingre = res[this.id];
      this.nombreSelect = this.ingre.nombre;
      console.log(this.ingre);

    });
  }
  async guardar() {
    const alert = await this.alertController.create({
      header: 'Cuidado, con este cambio puedes generar un error en la vista del menú',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            console.log(this.nombreSelect);

            const data = {
              id: this.ingre.id,
              nombre: this.nombreSelect,
              accion: 'modificar'
            };
            this.appservice.modificarIngrediente(data).subscribe((res: any) => {
              console.log(res);
              if (res.valido) {
                this.appservice.presentToast('success', 'Cambio realizado');
                window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab4/modIngre';
               // this.router.navigateByUrl('tabs/tab4/modIngre');
              }


            });
          },
        },
      ],
    });

    await alert.present();
  }
  async eliminar() {
    const alert = await this.alertController.create({
      header: 'Cuidado, con este cambio puedes generar un error en la vista del menú, ¿Deseas Eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            console.log(this.nombreSelect);

            const data = {
              id: this.ingre.id,
              nombre: this.nombreSelect,
              accion: 'eliminar'
            };
            this.appservice.modificarIngrediente(data).subscribe((res: any) => {
              console.log(res);
              if (res.valido) {
                this.appservice.presentToast('success', 'Cambio realizado');
                window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab4/modIngre';
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }

}
