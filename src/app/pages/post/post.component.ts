import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  comentariosForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    comentario: new FormControl('', [Validators.required, Validators.minLength(20)])
  });

  idPost: string;
  post: any;
  titulo: string;
  imagen: string;
  fecha: string;
  contenido: string;
  comentarios: any;
  constructor(private blogSvc: BlogService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idPost = id;
    this.blogSvc.PostById(id)
                .subscribe(res => {
                  this.post = res;
                  this.titulo = this.post.titulo;
                  this.imagen = this.post.imagen;
                  this.fecha = this.post.creado;
                  this.contenido = this.post.contenido;
                  this.blogSvc.comentsPostById(id)
                              .subscribe(coment => {
                                this.comentarios = coment;
                              });
                });
  }

  comentar(coment: any){
    this.blogSvc.sendComment(this.idPost, coment.email, coment.comentario)
                .then(cmt => {
                  Swal.fire('Comentario cargado correctamente');
                });
  }

}
