import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  checkOn = false;
  cont = 0;
  confirmado = false;
  datos: any;
  public user = this.authSvc.afAuth.user;
  compras: any;
  perfilUser: any;
  idUser: string;
  email: string;
  subtotal: number;
  descuento: number;
  liquidacion: number;

  apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
  merchantid = '508029';
  accountId = '512321';
  cifrado: string;
  moneda: 'COP';
  reference: number;

  deliveryForm = new FormGroup ({
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.minLength(7)]),
    ciudad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required)
  });

  private initValuesForm(){
    this.deliveryForm.patchValue({
      nombre: this.datos.datos.nombre,
      telefono: this.datos.datos.telefono,
      ciudad: this.datos.datos.ciudad,
      direccion: this.datos.datos.direccion
    });
  }

  constructor(private shopSvc: ShopService,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.email =  this.perfilUser.email;
      // console.log('Usuario: ', this.perfilUser);
      this.shopSvc.cargarCompras(this.idUser)
      .subscribe(res => {
        this.compras = res;
        console.log(this.compras);
        let saldo = 0;
        let descuent = 0;
        let ttal = 0;
        // tslint:disable-next-line: forin
        for (const key in this.compras){
          // tslint:disable-next-line: radix
          saldo = parseInt(this.compras[key].compra[7]) + saldo;
          // tslint:disable-next-line: radix
          descuent = parseInt(this.compras[key].compra[5]) + descuent;
          // tslint:disable-next-line: radix
          ttal = parseInt(this.compras[key].compra[6]) + ttal;
        }
        this.subtotal = saldo;
        this.descuento = descuent;
        this.liquidacion = ttal;
      });
      this.authSvc.loadInfoUser(this.idUser)
                  .subscribe(dataUser => {
                    this.datos = dataUser;
                    console.log(this.datos.datos);
                    this.initValuesForm();
                  });
    });
  }

  borrarProducto(compra){
    Swal.fire({
      title: 'Está seguro?',
      text: `Se eliminará definitivamente este producto del carrito!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then(result => {
      if (result.value) {
        this.shopSvc.deleteItemCarById(compra.id, this.idUser).then(() => {
          Swal.fire('Eliminado!', 'El producto ha sido borrado.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'Error al eliminar el producto', 'error');
        });
      }
    });
  }

  infoUser(info: any){
    this.confirmado = true;
    this.authSvc.updateInfoUser(this.idUser, info)
                .then(userInfo => {
                  Swal.fire('Actualizado!', 'Se han confirmado los datos de entrega.', 'success');
                });
  }

  payu(){
    if (this.checkOn) {
      this.reference = Math.ceil(Math.random() * 987524);
      const signature = Md5.init(`${this.apiKey}~${this.merchantid}~${this.reference}~${this.liquidacion}~COP`);
      const pasarela = `
    <img src="../../../assets/img/logo_payu.png" alt="" width="90">
    <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
      <input name="merchantId" type="hidden" value="${this.merchantid}">
      <input name="accountId" type="hidden" value="${this.accountId}">
      <input name="description" type="hidden" value="Pago TORREÓN MARKET">
      <input name="referenceCode" type="hidden" value="${this.reference}">
      <input name="amount" type="hidden" value="${this.liquidacion}">
      <input name="tax" type="hidden" value="0">
      <input name="taxReturnBase" type="hidden" value="0">
      <input name="currency" type="hidden" value="COP">
      <input name="signature" type="hidden" value="${signature}">
      <input name="test" type="hidden" value="1">
      <input name="buyerEmail" type="hidden" value="${this.email}">
      <input name="responseUrl" type="hidden" value="https://torreonmarket-25713.web.app/#/confirmacion">
      <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation">
      <button type="submit" class="btnPago">
          <i class="fa fa-credit-card" aria-hidden="true"> Aceptar </i>
      </button>
    </form>`;
      const fecha = new Date().getTime();
      const medio = 'PayU';
      const estado = 'Procesandose';
      const refer = this.reference.toString();
      this.shopSvc.sailProcess(refer, this.idUser, this.liquidacion,
      fecha, medio, estado).then(res => {
                this.shopSvc.saleProcessReference(this.idUser, this.reference.toString())
                .subscribe();
                Swal.fire({
                title: 'Realizar pago',
                icon: 'info',
                html: pasarela,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d46767',
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
    } else {
      Swal.fire({
        title: 'Error...',
        text: 'Debes aceptar términos y condiciones para la compra',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
        });
    }
  }

  check(event: any){
    if (this.cont === 0) {
      this.cont++;
      this.checkOn = true;
    } else if (this.cont > 0) {
      this.cont--;
      this.checkOn = false;
    }
  }
}
