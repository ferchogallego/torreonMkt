import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.scss']
})
export class SuscriptoresComponent implements OnInit {

  lista: any;
  constructor(private shopSvc: ShopService) { }

  ngOnInit(): void {
    this.shopSvc.listSuscriptores()
                .subscribe(susc => {
                  this.lista = susc;
                });
  }

}
