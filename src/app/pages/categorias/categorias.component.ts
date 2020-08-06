import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  cat: any;
  constructor(private productoSvc: ProductosService,
              private router: Router) { }

  ngOnInit(): void {
    this.productoSvc.loadCategories()
                    .subscribe(res => {
                      this.cat = res;
                    });
  }
  openProducts(categoria: string){
    // this.productoSvc.categoria = categoria;
    this.router.navigate([`/productos/${categoria}`]);
  }

}
