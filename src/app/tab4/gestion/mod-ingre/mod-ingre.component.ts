import { Component, OnInit, Output } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';

import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mod-ingre',
  templateUrl: './mod-ingre.component.html',
  styleUrls: ['./mod-ingre.component.scss'],
})
export class ModIngreComponent implements OnInit {
  ingre: any;

  constructor(public appservice: AppServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.appservice.leerIngredientes().subscribe((res: any) => {
      this.ingre = res;
    });
  }
  mod(id) {
    this.router.navigate([id - 1], { relativeTo: this.route, replaceUrl: true  });

  }
}
