import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../shared/file.interface';
import { PostI } from '../shared/post.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private filePath: any;
  private downloadURL: string;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { }

  filterPost(post: any, image: FileI){
    this.uploadImage(post, image);
  }

  private uploadImage(post: any, image: FileI){
    this.filePath = `blog/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.agregarPost(post);
        });
      })
    ).subscribe();
 }

 agregarPost(post: PostI){
  const prodObj = {
    imagen: this.downloadURL,
    titulo: post.titulo,
    contenido: post.contenido,
    introduccion: post.introduccion,
    fecha: post.fecha,
    fileRef: this.filePath
  };
  return this.db.collection('blog').add(prodObj);
}


  cargarPost(){
    return this.db.collection('blog').snapshotChanges()
               .pipe(
                 map(actions =>
                  actions.map(resp => {
                    const data = resp.payload.doc.data() as any;
                    const id = resp.payload.doc.id;
                    return {id, ...data};
                  }))
               );
  }
  PostById(idPost: string){
    return this.db.collection('blog').doc(idPost)
                  .valueChanges();
  }

  comentsPostById(idPost: string){
    return this.db.collection('blog')
                  .doc(idPost)
                  .collection('comentarios', ref => ref
                  .orderBy('fecha', 'desc'))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  sendComment(idPost: string, correo: string, comenta: string){
    return this.db.collection('blog').doc(idPost).collection('comentarios').add({
      autor: correo,
      comentario: comenta,
      fecha: Date.now()
    });
  }
  deleteCommentById(idBlog: string, idComm: string) {
    return this.db.collection('blog')
                  .doc(idBlog)
                  .collection('comentarios')
                  .doc(idComm)
                  .delete();
  }

  deletePostById(idBlog: string){
    return this.db.collection('blog').doc(idBlog).delete();
  }
}
