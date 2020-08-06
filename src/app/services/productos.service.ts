import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // carga de productos por categoria
  categoria: string;
  constructor(private db: AngularFirestore) { }

  loadCategoriesIndex(){
    return this.db.collection('categorias', ref => ref
                  .orderBy('orden').limit(9))
                  .valueChanges();
  }
  loadCategories(){
    return this.db.collection('categorias', ref => ref
                  .orderBy('orden'))
                  .valueChanges();
  }

  loadProductByCategory(cat: string){
    return this.db.collection('productos', ref => ref
    .where('categoria', '==', cat))
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
  loadProductById(id: string){
   return this.db.collection('productos').doc(id).valueChanges();
  }
  loadProductsForPrice(precio: number){
    return this.db.collection('productos', ref => ref
                  .where('precio', '<=', precio))
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
}
