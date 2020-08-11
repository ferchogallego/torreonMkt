import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  posts: any;
  articulo: any;
  imagen: string;
  titulo: string;
  contenido: string;
  comentarios: any;
  postId: string;

  constructor(private blogSvc: BlogService) { }

  ngOnInit(): void {
    this.blogSvc.cargarPost()
                .subscribe(res => {
                  this.posts = res;
                });
  }

  detallePost(idPost: string){
   this.postId = idPost;
   this.blogSvc.PostById(idPost)
               .subscribe(post => {
                  this.articulo = post;
                  this.imagen = this.articulo.imagen;
                  this.titulo = this.articulo.titulo;
                  this.contenido = this.articulo.contenido;
                  this.blogSvc.comentsPostById(idPost)
                              .subscribe(coment => {
                                this.comentarios = coment;
                              });
               });
  }

  borrarPost(idPost: string){
    Swal.fire({
      title: 'Está seguro?',
      text: `Se eliminará definitivamente este producto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then(result => {
      if (result.value) {
        this.blogSvc.deletePostById(idPost).then(() => {
          Swal.fire('Eliminado!', 'El artículo ha sido borrado.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'Error al eliminar el artículo', 'error');
        });
      }
    });
  }

  deleteComment(idComm: string){
    this.blogSvc.deleteCommentById(this.postId, idComm);
  }

}
