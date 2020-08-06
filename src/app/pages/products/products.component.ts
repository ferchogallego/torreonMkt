import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  rango = '0';
  categoria: string;
  lista: any;
  constructor(private productoSvc: ProductosService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productoSvc.loadProductByCategory(id)
                   .subscribe(res => {
                      console.log(res);
                      this.lista = res;
                   });
  }
  value(event: any){
    this.rango = event;
  }
  findPrice(valor: string){
    // tslint:disable-next-line: radix
    const cantidad = parseInt(valor);
    this.lista = '';
    // console.log(cantidad);
    this.productoSvc.loadProductsForPrice(cantidad)
    .subscribe (resp => {
      this.lista = resp;
      // console.log(this.juegos);
    });
  }
  openProduct(producto: string){
    this.router.navigate([`/producto/${producto}`]);
  }
}
