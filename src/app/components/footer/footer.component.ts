import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscriptionForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  });

  get emailNoValido() {
    return this.subscriptionForm.get('email').invalid && this.subscriptionForm.get('email').touched;
  }

  constructor(private suscripcion: SubscriptionsService,
              private router: Router) { }

  ngOnInit(): void {
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

  openHelp(item: string){
    this.router.navigate([`ayuda/${item}`]);
  }

}
