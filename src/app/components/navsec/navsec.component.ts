import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navsec',
  templateUrl: './navsec.component.html',
  styleUrls: ['./navsec.component.scss']
})
export class NavsecComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit(): void {
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

}
