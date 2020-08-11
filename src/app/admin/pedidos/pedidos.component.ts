import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  lista: any;
  request: any;
  idBuyer: string;
  delivery: any;

  ciudad: string;
  direccion: string;
  nombre: string;
  telefono: string;

  constructor(private shopSvc: ShopService) { }

  ngOnInit(): void {
    this.shopSvc.loadSalesAdmin().subscribe(res => {
      this.lista = res;
    });
  }

  filterByState(event: string){
    if (event !== 'todos') {
      this.lista = '';
      this.shopSvc.loadSalesAdminByState(event)
                    .subscribe(res => {
                      this.lista = res;
                    });
    } else {
      this.shopSvc.loadSalesAdmin().subscribe(res => {
        this.lista = res;
      });
    }
  }

  filterByRef(refer: string){
    this.lista = '';
    this.shopSvc.loadSalesAdminByReference(refer)
                   .subscribe(res => {
                      this.lista = res;
                      if (res.length === 0) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Referencia no encontrada.',
                          text: 'Verifica la referencia ingresada.',
                        });
                        this.shopSvc.loadSalesAdmin().subscribe(list => {
                          this.lista = list;
                        });
                      }
                   });
  }

  detailRequest(reference: string){
    this.shopSvc.loadSaleByReference(reference)
                    .subscribe(res => {
                      this.request = res;
                      console.log(this.request[0].usuario);
                      this.shopSvc.infoBuyerByDelivery(this.request[0].usuario)
                                  .subscribe(buyer => {
                                    this.delivery = buyer;
                                    console.log(this.delivery.datos);
                                    this.ciudad = this.delivery.datos.ciudad;
                                    this.direccion = this.delivery.datos.direccion;
                                    this.nombre = this.delivery.datos.nombre;
                                    this.telefono = this.delivery.datos.telefono;
                                  });
                    });
  }

  approve(reference: string, comprador: string){
    this.shopSvc.updateSale(comprador, reference)
                    .subscribe(result => {
                      const id = result[0].id;
                      this.shopSvc.updateSaleAccepted(id)
                          .then (sale => {
                            this.shopSvc.pedidos(comprador, reference)
                                .subscribe(pedido => {
                                  if (pedido) {
                                    Swal.fire({
                                      title: 'Aprobada',
                                      text: 'La venta se aprobó correctamente',
                                      icon: 'success',
                                      showCancelButton: false,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Ok'
                                    }).then((aprobado) => {
                                      if (aprobado.value) {
                                        window.location.reload();
                                      }
                                    });
                                  }
                                });
                          });
                    });
  }

  deny(idSale: string){
    this.shopSvc.pedidosCancelados(idSale)
                    .then(res => {
                      Swal.fire({
                        title: 'Eliminado',
                        text: 'El registro se ha borrado correctamente',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                      });
                    });
  }

}
