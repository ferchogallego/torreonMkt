import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { User } from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordView = false;
  usuario: User;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  registerForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get emailNoValido() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  ngOnInit(): void {
  }

  onRegister(){
    if (this.registerForm.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.registerForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success' + ' ' + ' ',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Creación de cuenta',
      text: 'Va a crear una cuenta en Torreón Market',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, crear cuenta',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const {email, password } = this.registerForm.value;
        try {
          const user = this.authSvc.register(email, password);
          if (user) {
              console.log(user.then(userData => {
                const id = userData.user.uid;
                const datos = {
                  id: userData.user.uid,
                  email: userData.user.email
                };
                swalWithBootstrapButtons.fire(
                  'Cuenta creada',
                  'Bienvenido a Torreón Market.',
                  'success'
                );
                this.authSvc.createUserData(id, datos);
                this.router.navigate(['/login']);
              }));
          }
        } catch (error) {
          console.log(error);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Te esperamos en Torreón Market :)',
          'error'
        );
      }
    });
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
                                  .then(usuario => {
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
                    } else  if (usr.length > 0) {
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

  viewPassActive(){
    this.passwordView = true;
    console.log(this.passwordView);
  }

  viewPassInActive(){
    this.passwordView = false;
    console.log(this.passwordView);
  }
}
