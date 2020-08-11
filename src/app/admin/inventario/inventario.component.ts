import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductI } from 'src/app/shared/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  productos: any;
  filterProducto = '';
  constructor(private productoSvc: ProductosService) { }

  ngOnInit(): void {
    this.productoSvc.loadAllProducts()
                    .subscribe (resp => {
                      this.productos = resp;
                      console.log(this.productos);
                    });
  }

  borrarProducto(producto: ProductI){
    Swal.fire({
      title: 'Está seguro?',
      text: `Se eliminará definitivamente este producto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then(result => {
      if (result.value) {
        this.productoSvc.deleteProductById(producto).then(() => {
          Swal.fire('Eliminado!', 'El producto ha sido borrado.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'Error al eliminar el producto', 'error');
        });
      }
    });
  }

}
