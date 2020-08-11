import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  public user = this.authSvc.afAuth.user;
  perfilUser: any;
  lista: any;
  idUser: string;
  productos: any;
  constructor(private shopSvc: ShopService,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.shopSvc.purchasesByBuyer(this.perfilUser.uid)
                      .subscribe(trans => {
                        this.lista = trans;
                        console.log(this.lista);
                      });
    });
  }

  openModal(ref: string){
    console.log(ref);
    this.shopSvc.loadSaleByReference(ref)
                    .subscribe(res => {
                      console.log(res);
                      this.productos = res;
                    });
  }

}
