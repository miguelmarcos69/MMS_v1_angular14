import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from '../tab4/gestion/config/config.component';
import { LoginComponent } from '../login/login.component';
import { AnadirComponent } from './comandas/anadir/anadir.component';
import { DomicilioComponent } from './comandas/domicilio/domicilio.component';
import { LlevarComponent } from './comandas/llevar/llevar.component';
import { Tab1Page } from './tab1.page';
import { TicketComponent } from './comandas/ticket/ticket.component';

const routes: Routes = [

  {
    path: '',
    component: Tab1Page,
  },
 // { path: '', redirectTo: '/first-component', pathMatch: 'full' },
  {
    path: 'mesa',
    component: AnadirComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'llevar',
    component: LlevarComponent,
  },
  {
    path: 'domicilio',
    component: DomicilioComponent,
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: ':rec',
    component: Tab1Page,
  },
  {
    path: 'mesa/ticket/:id',
    component: TicketComponent,
  },
  {
    path: 'mesa/ticket/:id:/:rec',
    component: TicketComponent,
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule { }
