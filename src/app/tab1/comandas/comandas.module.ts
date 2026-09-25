import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab1PageRoutingModule } from '../tab1-routing.module';
import { ComandasComponent } from './comandas/comandas.component';
import { HttpClientModule } from '@angular/common/http';
import { ComandaModalComponent } from './comanda-modal/comanda-modal.component';
import { AnadirComponent } from './anadir/anadir.component';
import { LoginComponent } from 'src/app/login/login.component';
import { LlevarComponent } from './llevar/llevar.component';
import { ConfigComponent } from 'src/app/tab4/gestion/config/config.component';
import { DomicilioComponent } from './domicilio/domicilio.component';
import { TicketComponent } from './ticket/ticket.component';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';


@NgModule({
  declarations: [ComandasComponent, ComandaModalComponent, AnadirComponent, LoginComponent, LlevarComponent,
    ConfigComponent, DomicilioComponent, TicketComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    SocketIoModule
  ], providers: [SocketService],

  exports: [ComandasComponent],
})
export class ComandasModule { }
