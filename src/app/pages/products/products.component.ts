import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductI} from '../../shared/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  busqueda = false;
  filterProducto = '';
  rango = '0';
  categoria: string;
  lista: any;
  productos: ProductI[] = [];
  constructor(private productoSvc: ProductosService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productoSvc.loadAllProducts()
                   .subscribe(res => {
                      this.lista = res;
                      // tslint:disable-next-line: prefer-for-of
                      for (let i = 0; i < this.lista.length; i++) {
                        const prd = this.lista[i];
                        // tslint:disable-next-line: prefer-for-of
                        for (let a = 0; a < prd.categoria.length; a++) {
                          const catsel = prd.categoria[a];
                          if (catsel === id) {
                            this.productos.push(prd);
                          }
                        }
                      }
                   });
  }

  loadByCategory(categoria: string){
    this.busqueda = false;
    this.productos = [];
    const id = categoria;
    this.productoSvc.loadAllProducts()
                   .subscribe(res => {
                      this.lista = res;
                      // tslint:disable-next-line: prefer-for-of
                      for (let i = 0; i < this.lista.length; i++) {
                        const prd = this.lista[i];
                        // tslint:disable-next-line: prefer-for-of
                        for (let a = 0; a < prd.categoria.length; a++) {
                          const catsel = prd.categoria[a];
                          if (catsel === id) {
                            this.productos.push(prd);
                          }
                        }
                      }
                   });
  }
  allProducts(){
    this.busqueda = false;
    this.productos = [];
    this.lista = '';
    this.productoSvc.loadAllProducts()
                   .subscribe(res => {
                     this.lista = res;
                     // tslint:disable-next-line: prefer-for-of
                     for (let i = 0; i < this.lista.length; i++) {
                      const prd = this.lista[i];
                      this.productos.push(prd);
                     }
                   });
  }
  searchProductActivate(){
    this.busqueda = true;
    this.productos = [];
    this.lista = '';
    this.productoSvc.loadAllProducts()
                   .subscribe(res => {
                     this.lista = res;
                   });
  }

  value(event: any){
    this.rango = event;
  }

  openProduct(producto: string){
    this.router.navigate([`/producto/${producto}`]);
  }
}
