import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  @ViewChild('sectionSubscribe', { static: true }) sectionSubscribeDiv: ElementRef;

  public user = this.authSvc.afAuth.user;
  perfilUser: any;
  showModal = false;

  solicitud: any = {
    compra: [],
    estado: 'Pendiente',
    fecha: new Date().getTime(),
    usuario: '',
  };

  cant = 1;
  detalle: any;
  nombre: string;
  imagen: string;
  precio: string;
  descuento: number;
  cantidad: number;
  categoria: string;
  descripcion: string;
  beneficios: any;
  uso: string;
  idProd: string;
  presentacion: string;
  elementPosition: any;


  constructor(private productoSvc: ProductosService,
              private route: ActivatedRoute,
              private authSvc: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.scrollToSubscribe();

    this.user.subscribe(resp => {
      this.perfilUser = resp;
      if (!this.perfilUser) {
       this.showModal = true;
      }
 });
    const id = this.route.snapshot.paramMap.get('id');
    this.idProd = id;
    this.productoSvc.loadProductById(id)
                    .subscribe(res => {
                      this.detalle = res;
                      this.cantidad = this.detalle.cantidad;
                      console.log(this.cantidad);
                      this.nombre = this.detalle.nombre;
                      this.precio = this.detalle.precio;
                      this.imagen = this.detalle.imagen;
                      this.descuento = this.detalle.descuento;
                      this.categoria = this.detalle.categoria;
                      this.beneficios = this.detalle.beneficios;
                      this.descripcion = this.detalle.descripcion;
                      this.uso = this.detalle.uso;
                      this.presentacion = this.detalle.presentacion;
                      // console.log(this.detalle);
                    });
  }

  scrollToSubscribe(){
    this.sectionSubscribeDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (this.cantidad > 0) {
      this.user.subscribe(resp => {
        this.perfilUser = resp;
        const total = Number(this.cant) * Number(this.precio);
        const totalDesc = (total * this.descuento) / 100;
        const totalNeto = total - totalDesc;
        this.solicitud.compra.push(this.idProd, this.nombre, this.imagen, this.precio, this.cant, totalDesc, totalNeto, total);
        this.solicitud.usuario = this.perfilUser.uid;
        this.productoSvc.cargarPedido(this.solicitud)
                        .then(orden => {
                          this.router.navigate(['/solicitudes']);
                        }).catch(err => console.log(err));
      });
    } else {
      Swal.fire(
        'Producto agotado :(',
        'Por el momento tenemos inventario para la venta',
        'error'
      );
    }
  }

  onLoginFacebook(){
    this.authSvc.loginFacebook().then(resp => {
      const id = resp.user.uid;
      const datos = {
                  id: resp.user.uid,
                  email: resp.user.email
                };
      this.authSvc.verifyUser(id)
                  .subscribe(usr => {
                    if (usr.length === 0) {
                      this.authSvc.createUserData(id, datos)
                                  .then(usuario => {
                                    this.showModal = false;
                                    Swal.fire({
                                      title: 'Usuario registrado',
                                      text: 'Se ha creado registro con facebook',
                                      icon: 'success',
                                      showCancelButton: false,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Continuar'
                                    }).then((result) => {
                                      location.reload();
                                    });
                                  });
                    } else if (usr.length > 0) {
                      this.showModal = false;
                      Swal.fire({
                        title: 'Hola de nuevo',
                        text: 'Gracias por visitar Torreón Market',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Continuar'
                      }).then((result) => {
                        location.reload();
                      });
                    }
                  });
    }).catch(err => console.log('Error', err.message));
  }

  onLoginGoogle(){
    this.authSvc.loginGoogle().then(resp => {
      const id = resp.user.uid;
      const datos = {
                  id: resp.user.uid,
                  email: resp.user.email
                };
      this.authSvc.verifyUser(id)
                  .subscribe(usr => {
                    if (usr.length === 0) {
                      this.authSvc.createUserData(id, datos)
                                  .then (save => {
                                    this.showModal = false;
                                    Swal.fire({
                                      title: 'Usuario registrado',
                                      text: 'Se ha creado registro con Google',
                                      icon: 'success',
                                      showCancelButton: false,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Continuar'
                                    }).then((result) => {
                                      location.reload();
                                    });
                                  });
                    } else if (usr.length > 0) {
                      this.showModal = false;
                      Swal.fire({
                        title: 'Hola de nuevo',
                        text: 'Gracias por visitar Torreón Market',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Continuar'
                      }).then((result) => {
                        location.reload();
                      });
                    }
                  });
    }).catch(err => console.log('Error', err.message));
  }

  onLoginRedirect(){
    this.router.navigate(['/home']);
  }

}
