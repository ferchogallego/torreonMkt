import { Injectable } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Order } from '../shared/order.interface';
import { ProductI } from '../shared/product.interface';
import { FileI } from '../shared/file.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productosCollection: AngularFirestoreCollection<ProductI>;

  // carga de productos por categoria
  categoria: string;
  // búsqueda desde barra
  termino: string;

  // barra cookies
  ckies = true;

  private filePath: any;
  private downloadURL: string;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
   this.productosCollection = db.collection<ProductI>('productos');
  }

  filterProd(producto: ProductI, image: FileI){
    this.uploadImage(producto, image);
  }
  private uploadImage(producto: ProductI, image: FileI){
    this.filePath = `productos/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.agregarProductos(producto);
        });
      })
    ).subscribe();
 }

 agregarProductos(producto: ProductI){
  const prodObj = {
    categoria: producto.categoria,
    solucion: producto.solucion,
    imagen: this.downloadURL,
    nombre: producto.nombre,
    cantidad: producto.cantidad,
    precio: producto.precio,
    presentacion: producto.presentacion,
    uso: producto.uso,
    fechaCreacion: producto.fechaCreacion,
    fileRef: this.filePath,
    beneficios: producto.beneficios,
    descripcion: producto.descripcion
  };
  if (producto.id) {
    return this.productosCollection.doc(producto.id).update(prodObj);
  } else {
    return this.productosCollection.add(prodObj);
  }
}

updateProductById(producto: ProductI, newImage?: FileI){
  if (newImage) {
    this.uploadImage(producto, newImage);
  } else {
    return this.productosCollection.doc(producto.id).update(producto);
  }
}

deleteProductById(producto: ProductI) {
  return this.productosCollection.doc(producto.id).delete();
}

getProductById(id: string){
  return this.productosCollection.doc(id).valueChanges();
}

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

  loadAllProducts(){
    return this.db.collection('productos', ref => ref
                  .orderBy('nombre', 'asc'))
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

  loadProductByCategory(cat: string){
    return this.db.collection('productos', ref => ref
    .where('categoria'[0], '==', cat))
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
  cargarPedido(order: Order){
    return this.db.collection('carShop').add(order);
  }
}
