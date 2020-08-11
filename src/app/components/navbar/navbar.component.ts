import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user = this.authSvc.afAuth.user;
  pedidos: any;
  perfilUser: any;
  idUser: string;

  searchForm = new FormGroup ({
    palabra: new FormControl('')
  });

  constructor(private shopSvc: ShopService,
              private router: Router,
              private authSvc: AuthService,
              private productoSvc: ProductosService) { }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.shopSvc.cantPedidos(this.idUser)
                  .subscribe(cant => {
                    this.pedidos = cant.length;
                  });
    });
  }

  OnSearch(word: string){
    // console.log(word);
    this.productoSvc.termino = word;
    if (word) {
      this.router.navigate(['/catalogo']);
    }
   }
}
