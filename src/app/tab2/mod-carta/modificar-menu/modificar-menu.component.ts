import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ComandasService } from 'src/app/services/comandas.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



@Component({
  selector: 'app-modificar-menu',
  templateUrl: './modificar-menu.component.html',
  styleUrls: ['./modificar-menu.component.scss'],
})
export class ModificarMenuComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;



  archivos: any;
  prev: boolean;
  prev2: boolean;
  tipo: any;
  id: string;
  bebida: any;
  platos: any;
  ingredientes: any;
  dato: any;
  name;

  url: any;
  nomSelec: any;
  ingSelec: any;
  precSelec: any;
  previsualizacion: any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null,
    tipo: null
  };
  anadirPlatosDatos: any;
  message: { nombre: string };

  constructor(private comandasService: ComandasService,
    private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private appService: AppServiceService) {
    this.dato = JSON.parse('{}');
    this.anadirPlatosDatos = JSON.parse('{}');
    this.archivos = new Array();
    this.url = this.appService.url;
    this.prev2 = false;
    this.prev = true;

    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.id = this.route.snapshot.paramMap.get('id');
  }




  ngOnInit() {

    this.load();
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.load();
      event.target.complete();
    }, 2000);
  };
  onClick(ing, idPlato) {
    let i = 0;
    this.dato.ingredientes.forEach(element => {
      if (ing.id === element.id) {
        this.dato.ingredientes.splice(i, 1);
      }
      i++;
    });

  };

  anadirIng() {

    this.ingSelec.forEach(ing => {

      this.ingredientes.forEach(todIngr => {
        if (todIngr.id === ing) {
          let existe = false;

          this.dato.ingredientes.forEach(datIng => {
            console.log();

            if (datIng.id === ing) {
              existe = true;
            }
            console.log(existe);


          });


          if (!existe) {
            this.dato.ingredientes.push(todIngr);
          }
        }

      });
    });

  }

  load() {
    if (this.tipo === 'bebida') {
      this.comandasService.leerBebida().subscribe((res) => {
        this.bebida = res;
        console.log(this.bebida);
        this.bebida.forEach(element => {
          if (this.id === element.id) {
            this.dato = element;
            this.nomSelec = this.dato.nombre;
            this.previsualizacion = this.dato.img;
            this.precSelec = this.dato.precio;
            console.log(this.dato);

          }
        });

      });
    }
    if (this.tipo === 'platos') {
      this.comandasService.leerPlatos().subscribe((res) => {
        this.platos = res;
        console.log(this.platos);
        this.platos.forEach(element => {
          if (this.id === element.id) {
            this.dato = element;
            this.nomSelec = this.dato.nombrePlato;
            this.previsualizacion = this.dato.img;
            this.precSelec = this.dato.precio;
            console.log(this.dato);

          }
        });


      });

      this.comandasService.leerIngredientes().subscribe((res) => {
        this.ingredientes = res;
        console.log(this.ingredientes);

      });
    }




  }


  capturarFile(evento) {
    const archivoCapturado = evento.target.files[0];
    console.log(evento);
    console.log(archivoCapturado);
    this.archivo.nombreArchivo = archivoCapturado.name;
    console.log(this.archivo);

    this.archivos.push(archivoCapturado);

    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.prev = false;
      this.prev2 = true;
      // this.archivo.base64textString = imagen.base;
    });

    if (evento.target.files && archivoCapturado) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(archivoCapturado);
    }
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


  handleReaderLoaded(readerEvent) {
    const binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
  modificar() {
    const ing = [];
    if (this.dato.ingredientes) {

      this.dato.ingredientes.forEach(element => {
        ing.push(element.id);

      });
    }
    const datos = {
      id: this.dato.id,
      nombre: this.nomSelec,
      ingredientes: ing,
      precio: this.precSelec,
      tipo: this.tipo

    };
    console.log(datos);

    this.appService.modificarPlatos(datos).subscribe((res) => {
      this.anadirPlatosDatos = res;
      console.log(this.anadirPlatosDatos);

      this.subirArchivo(this.anadirPlatosDatos.id);
      //this.load();
    });
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

      if (this.archivo.nombreArchivo !== null) {

        this.http.post(this.url + '/proyectoDAW/subirfichero.php', this.archivo).subscribe((res: any) => {

          console.log('Respuesta del servidor', res);
          this.appService.presentToast('success', 'Se ha modificado correctamente');
          window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab2';


        });
      } else {
        window.location.href = window.location.protocol + '//' + window.location.host + '/tabs/tab2';

      }
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
        this.appService.presentToast('success', 'El incgrediente se ha añadido corectamente');
        this.load();
      });
    }
  }
}
