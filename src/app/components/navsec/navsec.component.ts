import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-navsec',
  templateUrl: './navsec.component.html',
  styleUrls: ['./navsec.component.scss']
})
export class NavsecComponent implements OnInit {

  public user = this.authSvc.afAuth.user;
  pedidos: any;
  perfilUser: any;
  idUser: string;

  passwordView = false;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,
              private router: Router,
              private shopSvc: ShopService) { }

  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get emailNoValido() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  ngOnInit(): void {
    this.user.subscribe(resp => {
      this.perfilUser = resp;
      this.idUser = this.perfilUser.uid;
      this.shopSvc.cantPedidos(this.idUser)
                  .subscribe(cant => {
                    this.pedidos = cant.length;
                  });
    });
  }

  onLogin(){
    const {email, password } = this.loginForm.value;
    try {
      const user = this.authSvc.login(email, password);
      if (user) {
        user.then(usuario => {
          location.reload();
        }).catch(err => {
          Swal.fire({
            title: 'Error...',
            text: 'Email o contraseña inválidos',
            icon: 'error',
            allowOutsideClick: false,
            showCloseButton: true
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
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
    // console.log(this.passwordView);
  }

  viewPassInActive(){
    this.passwordView = false;
    // console.log(this.passwordView);
  }

}
