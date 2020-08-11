import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  rango = '0';
  filterProducto = '';
  lista: any;

  constructor(private productoSvc: ProductosService,
              private router: Router) { }

  ngOnInit(): void {
    this.productoSvc.loadAllProducts()
      .subscribe (resp => {
        this.lista = resp;
        // console.log(this.lista);
      });
    if (this.productoSvc.termino) {
        this.filterProducto = this.productoSvc.termino;
        console.log(this.filterProducto);
      }
  }

  openProduct(producto: string){
    this.router.navigate([`/producto/${producto}`]);
  }

  value(event: any){
    this.rango = event;
  }

  findPrice(valor: string){
    // tslint:disable-next-line: radix
    const cantidad = parseInt(valor);
    this.lista = '';
    console.log(cantidad);
    this.productoSvc.loadProductsForPrice(cantidad)
    .subscribe (resp => {
      this.lista = resp;
      console.log(this.lista);
    });
  }

}
