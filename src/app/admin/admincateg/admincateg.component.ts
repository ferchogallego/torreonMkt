import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-admincateg',
  templateUrl: './admincateg.component.html',
  styleUrls: ['./admincateg.component.scss']
})
export class AdmincategComponent implements OnInit {

  categorias: any;
  catSelected: string;
  orden: number;
  constructor(private prodSvc: ProductosService) { }

  ngOnInit(): void {
    this.prodSvc.loadCategoriesAdmin()
                .subscribe(res => {
                  this.categorias = res;
                });
  }

  activaCategoria(idCat: string){
    Swal.fire({
      title: 'Activar Categoría',
      text: 'Se va a activar esta categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodSvc.activarCategoria(idCat);
        Swal.fire(
          'Activado!',
          'Categoría activada correctamente.',
          'success'
        );
      }
    });
  }

  desactivaCategoria(idCat: string){
    Swal.fire({
      title: 'Desactivar Categoría',
      text: 'Se va a desactivar esta categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodSvc.desactivarCategoria(idCat);
        Swal.fire(
          'Desactivada!',
          'Categoría desactivada correctamente.',
          'success'
        );
      }
    });
  }

  dataCat(idCat: string){
    this.catSelected = idCat;
  }

  newOrderCat(nuevo: number){
    this.orden = Number(nuevo);
  }

  actualizarOrden(){
    Swal.fire({
      title: 'Actualizar orden',
      text: 'Se va a modificar el orden de esta categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodSvc.ordenCategoria(this.catSelected, this.orden);
        Swal.fire(
          'Actualizada!',
          'Categoría actualizada correctamente.',
          'success'
        );
      }
    });
  }

}
