import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-response-payu',
  templateUrl: './response-payu.component.html',
  styleUrls: ['./response-payu.component.scss']
})
export class ResponsePayuComponent implements OnInit {

  perfilUser: any;
  idUser: string;
  referencia: number;
  resultado: any;

  public user = this.authSvc.afAuth.user;

  constructor(private activatedRoute: ActivatedRoute,
              private shopSvc: ShopService,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      // tslint:disable-next-line: radix
      this.referencia = this.activatedRoute.snapshot.queryParams.referenceCode;
      const refer = this.referencia.toString();
      // console.log('prueba: ', refer);
      if (this.activatedRoute.snapshot.queryParams.transactionState === '4'){
        Swal.fire({
          title: 'Venta realizada',
          text: 'El pedido fué enviado correctamente',
          icon: 'success',
          allowOutsideClick: false,
          showCloseButton: true
        });
        this.shopSvc.validateSale(this.idUser, refer).subscribe(res => {
           this.resultado = res;
           const id = this.resultado[0].id;
           this.shopSvc.updateSaleAccepted(id).then( resultado => {
             this.shopSvc.pedidos(this.idUser, refer).subscribe(car => {
               console.log(car);
             });
           }).catch(err => {
            Swal.fire({
              title: 'Error...',
              text: 'Algo salió mal!!!',
              icon: 'error',
              allowOutsideClick: false,
              showCloseButton: true
            });
          });
        });
    } else if (this.activatedRoute.snapshot.queryParams.transactionState === '6') {
      console.log('Rechazado');
      this.shopSvc.validateSale(this.idUser, refer).subscribe(res => {
        console.log(res);
        this.resultado = res;
        const id = this.resultado[0].id;
        this.shopSvc.updateSaleRejected(id).then(resultado => {
          Swal.fire({
            title: 'Venta rechazada',
            text: 'La venta no pudo finalizarse',
            icon: 'error',
            allowOutsideClick: false,
            showCloseButton: true
          });
        });
      });
    }
    });
  }

}
