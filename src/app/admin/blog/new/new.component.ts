import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { PostI } from '../../../shared/post.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  image: any;
  imageSrc: any;

  constructor(private blogSvc: BlogService,
              private router: Router) { }

  newPostForm = new FormGroup ({
    imagen: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    introduccion: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
    fecha: new FormControl(new Date().getTime()),
  });

  ngOnInit(): void {
  }

  addPost(post: PostI){
    if ( this.newPostForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.newPostForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.blogSvc.filterPost(post, this.image);
    Swal.fire({
      title: 'Blog publicado',
      text: 'Creado satisfactoriamente',
      icon: 'success',
      showCloseButton: true
    });
    this.router.navigate(['/listaPost']);
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(this.image);
  }


}
