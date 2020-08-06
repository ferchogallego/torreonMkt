import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ContactoI } from '../shared/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private db: AngularFirestore) { }

  emailSubscription(correo: string){
    return this.db.collection('subscription').add({
      email: correo,
      fecha: new Date()
    });
  }

  verifyEmailSubscription(correo: string){
    return this.db.collection('subscription', ref => ref
                  .where('email', '==', correo))
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

  enviaMensaje(msje: ContactoI){
    const prodObj = {
      nombre: msje.nombre,
      correo: msje.correo,
      telefono: msje.telefono,
      ciudad: msje.ciudad,
      mensaje: msje.mensaje
    };
    return this.db.collection('mensajes').add(prodObj);
  }

}
