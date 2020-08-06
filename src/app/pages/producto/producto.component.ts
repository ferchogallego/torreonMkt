import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  public user = this.authSvc.afAuth.user;
  perfilUser: any;
  showModal = false;

  cant = 1;
  detalle: any;
  nombre: string;
  imagen: string;
  precio: string;
  categoria: string;
  descripcion: string;
  beneficios: any;
  uso: string;
  presentacion: string;
  constructor(private productoSvc: ProductosService,
              private route: ActivatedRoute,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      if (!this.perfilUser) {
       this.showModal = true;
      }
 });
    const id = this.route.snapshot.paramMap.get('id');
    this.productoSvc.loadProductById(id)
                    .subscribe(res => {
                      this.detalle = res;
                      this.nombre = this.detalle.nombre;
                      this.precio = this.detalle.precio;
                      this.imagen = this.detalle.imagen;
                      this.categoria = this.detalle.categoria;
                      this.beneficios = this.detalle.beneficios;
                      this.descripcion = this.detalle.descripcion;
                      this.uso = this.detalle.uso;
                      this.presentacion = this.detalle.presentacion;
                      console.log(this.beneficios);
                    });
  }

  cantidadProducto(operacion: string){
    if (operacion === 'restar') {
      this.cant--;
      if (this.cant < 1) {
        this.cant = 1;
      }
    }
    if (operacion === 'sumar') {
      this.cant++;
      if (this.cant > 20) {
        this.cant = 20;
      }
    }
  }

  sendRequest(){

  }

}
