import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';
import { SubscriptionsService } from '../../services/subscriptions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent implements OnInit {

  cat: any;
  subscriptionForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  });

  contactForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    mensaje: new FormControl('', Validators.required)
  });

  get emailNoValido() {
    return this.subscriptionForm.get('email').invalid && this.subscriptionForm.get('email').touched;
  }

  constructor(private productoSvc: ProductosService,
              private route: Router,
              private suscripcion: SubscriptionsService) { }

  ngOnInit(): void {
    this.productoSvc.loadCategoriesIndex()
                    .subscribe(res => {
                      this.cat = res;
                      console.log(this.cat);
                    });
  }
  openCategories(categoria: string){
    console.log(categoria);
    this.route.navigate([`/productos/${categoria}`]);
  }

  subscription(correo){
    if (this.subscriptionForm.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar un email válido',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.subscriptionForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const mail = correo.email;
    this.suscripcion.verifyEmailSubscription(mail)
                    .subscribe(result => {
                      console.log(result.length);
                      if (result.length === 0) {
                        this.suscripcion.emailSubscription(mail)
                                        .then(res => {
                                          Swal.fire(
                                             mail,
                                            'Inscripción generada correctamente',
                                            'success'
                                            );
                                          });
                      } else {
                        Swal.fire(
                          mail,
                          'Ya se encuentra inscrito',
                          'question'
                        );
                      }
                    });
  }

  message(contacto: any){
    if (this.contactForm.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe llenar todos los campos para enviar el mensaje',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.contactForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.suscripcion.enviaMensaje(contacto)
                    .then(msj => {
                      Swal.fire({
                        title: 'Mensaje enviado',
                        text: 'Muchas gracias por contactarnos',
                        icon: 'success',
                        allowOutsideClick: false,
                        showCloseButton: true
                      });
                    });
  }

}
