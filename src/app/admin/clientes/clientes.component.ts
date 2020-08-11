import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  lista: any;
  constructor(private shopSvc: ShopService) { }

  ngOnInit(): void {
    this.shopSvc.listClientActive()
                .subscribe(list => {
                  this.lista = list;
                });
  }

}
