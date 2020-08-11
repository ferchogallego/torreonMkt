import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  lista: any;
  constructor(private shopSvc: ShopService) { }

  ngOnInit(): void {
    this.shopSvc.listMensajes()
                .subscribe(msje => {
                  this.lista = msje;
                });
  }

}
