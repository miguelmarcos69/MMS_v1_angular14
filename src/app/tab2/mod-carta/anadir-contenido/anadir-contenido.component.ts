import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AppServiceService } from 'src/app/services/app-service.service';


@Component({
  selector: 'app-anadir-contenido',
  templateUrl: './anadir-contenido.component.html',
  styleUrls: ['./anadir-contenido.component.scss'],
})
export class AnadirContenidoComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message;
  name: string;

  previsualizacion;
  archivos: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null,
    tipo: null,
  };
  platos;
  ingredientes;
  bebida;
  nomSelec;
  ingSelec;
  precSelec;
  tipo: string;
  anadirPlatosDatos: any;
  constructor(private http: HttpClient, private appService: AppServiceService, private route: ActivatedRoute,) {
    this.archivos = new Array();
    this.anadirPlatosDatos = JSON.parse('{}');
    this.tipo = this.route.snapshot.paramMap.get('tipo');

  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.appService.leerPlatos().subscribe((res) => {
      this.platos = res;
      console.log(this.platos);

    });

    this.appService.leerIngredientes().subscribe((res) => {
      this.ingredientes = res;
      console.log(this.ingredientes);

    });

    this.appService.leerBebida().subscribe((res) => {
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
  capturarFile(evento) {
    const archivoCapturado = evento.target.files[0];
    console.log(evento);
    console.log(archivoCapturado);
    this.archivo.nombreArchivo = archivoCapturado.name;

    this.archivos.push(archivoCapturado);

    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      // this.archivo.base64textString = imagen.base;
    });

    if (evento.target.files && archivoCapturado) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(archivoCapturado);
    }
  }
  handleReaderLoaded(readerEvent) {
    const binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    console.log($event);

    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };

      reader.onerror = error => {
        resolve({
          base: null,
        });
      };
      return reader;
    }
    catch (e) {
      return null;
    }
  });



  crear() {
    console.log(this.ingSelec);
    console.log(this.nomSelec);
    if (this.nomSelec !== undefined && this.precSelec !== undefined) {

      const datos = {
        nombre: this.nomSelec,
        ingredientes: this.ingSelec,
        precio: this.precSelec,
        tipo: this.tipo

      };
      this.appService.anadir(datos).subscribe((res) => {
        this.anadirPlatosDatos = res;
        if (this.anadirPlatosDatos.valido) {
          this.subirArchivo(this.anadirPlatosDatos.id);
          this.load();
          //this.appService.presentToast('success', '')
        } else {
          this.appService.presentToast('danger', this.anadirPlatosDatos.msg);

        }
      });
    } else {
      this.appService.presentToast('danger', 'Falta de completar algun parámetro');
    }
  }




  subirArchivo(id) {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo);
      });
      this.archivo.nombre = id;
      this.archivo.tipo = this.tipo;
      console.log(this.archivo);



      this.http.post(this.appService.url + '/proyectoDAW/subirfichero.php', this.archivo).subscribe((res: any) => {
        this.appService.presentToast('success', res.msg);
        window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab2';


      });
    } catch (e) {
      console.log(e);

    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

      this.message = { nombre: ev.detail.data };

      this.appService.anadirIngrediente(this.message).subscribe((res) => {
        this.appService.presentToast('success', 'El incgrediente se ha a�adido corectamente');
        this.load();
      });
    }
  }
}
