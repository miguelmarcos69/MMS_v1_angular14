import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComandasModule } from 'src/app/tab1/comandas/comandas.module';
import { Tab1PageRoutingModule } from 'src/app/tab1/tab1-routing.module';
import { Tab3PageRoutingModule } from '../tab3-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatosUsuarComponent } from './datos-usuar/datos-usuar.component';



@NgModule({
  declarations: [DatosUsuarComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    HttpClientModule,
  ],
  exports:[DatosUsuarComponent]
})
export class DatosUsuarModule { }
