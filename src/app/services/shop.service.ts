import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Order } from '../shared/order.interface';
import { SaleI } from '../shared/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private db: AngularFirestore) { }

  cargarCompras(userId: string){
    return this.db.collection('carShop/', ref => ref
                  .where('estado', '==', 'Pendiente')
                  .where('usuario', '==', userId)).snapshotChanges()
                  .pipe(
                   map(actions =>
                    actions.map(resp => {
                    const data = resp.payload.doc.data() as Order;
                    const id = resp.payload.doc.id;
                    return {id, ...data};
                    }))
                   );
   }

   deleteItemCarById(id: string, userId: string){
    return this.db.collection('carShop/', ref => ref
   .where('estado', '==', 'Pendiente')
   .where('usuario', '==', userId)).doc(id).delete();
  }

  sailProcess(referencia: string, buyer: string, total: number, fecha: any, pago: string, estado: string){
    return this.db.collection('sales').add({
      reference: referencia,
      comprador: buyer,
      precio: total,
      comprado: fecha,
      medio: pago,
      state: estado
    });
  }

  saleProcessReference(userId: string, referencia: any){
    return this.db.collection('carShop/', ref => ref
                  .where('estado', '==', 'Pendiente')
                  .where('usuario', '==', userId)).snapshotChanges()
                  .pipe(
                    map(actions =>
                      actions.map(resp => {
                        const data = resp.payload.doc.data();
                        const id = resp.payload.doc.id;
                        let conIf = 0;
                        this.db.collection('carShop/').doc(id).update({
                          RefCompra: referencia
                        }).then(result => {
                            conIf++;
                            // tslint:disable-next-line: no-string-literal
                            if (conIf === data['docs']['length']){
                                return(conIf);
                              }
                          });
                      }))
                  );
  }

  validateSale(userId: string, referencia: string){
    return this.db.collection('sales/', ref => ref
                  .where('reference', '==', referencia)
                  .where('state', '==', 'Procesandose')
                  .where('comprador', '==', userId)).snapshotChanges()
                  .pipe(
                   map(actions =>
                    actions.map(resp => {
                    const data = resp.payload.doc.data() as SaleI;
                    const id = resp.payload.doc.id;
                    return {id, ...data};
                    }))
                   );
  }

  updateSaleAccepted(id: string){
    return this.db.collection('sales').doc(id).update({state : 'Aprobada'});
  }

  pedidos(userId: string, referencia: string){
    return this.db.collection('carShop/', ref => ref
                  .where('RefCompra', '==', referencia)
                  .where('usuario', '==', userId)).snapshotChanges()
                  .pipe(
                    map(actions =>
                      actions.map(resp => {
                        const data = resp.payload.doc.data();
                        const id = resp.payload.doc.id;
                        let conIf = 0;
                        this.db.collection('carShop/').doc(id).update({
                          estado : 'Venta',
                        }).then(result => {
                            conIf++;
                            // tslint:disable-next-line: no-string-literal
                            if (conIf === data['docs']['length']){
                                return(conIf);
                              }
                          });
                      }))
                  );
  }

  updateSaleRejected(id: string){
    return this.db.collection('sales').doc(id).update({state : 'Rechazada'});
  }

  loadSalesAdmin(){
    return this.db.collection('sales')
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

  loadSalesAdminByState(estado: string){
    return this.db.collection('sales/', ref => ref
    .where('state', '==', estado)).valueChanges();
   }

   loadSalesAdminByReference(rfce: string){
    return this.db.collection('sales/', ref => ref
    .where('reference', '==', rfce)).valueChanges();
   }

   loadSaleByReference(compra: string){
    return this.db.collection('carShop/', ref => ref
    .where('RefCompra', '==', compra)).valueChanges();
   }

   updateSale(userId: string, referencia: string){
    return this.db.collection('sales/', ref => ref
                  .where('reference', '==', referencia)
                  .where('comprador', '==', userId)).snapshotChanges()
                  .pipe(
                   map(actions =>
                    actions.map(resp => {
                    const data = resp.payload.doc.data() as SaleI;
                    const id = resp.payload.doc.id;
                    return {id, ...data};
                    }))
                   );
  }

  pedidosCancelados(idSale: string){
    return this.db.collection('sales').doc(idSale).delete();
  }

  infoBuyerByDelivery(idBuyer: string){
    return this.db.collection('users').doc(idBuyer).valueChanges();
  }

  listClientActive(){
    return this.db.collection('users').valueChanges();
  }

  listSuscriptores(){
    return this.db.collection('subscription').valueChanges();
  }

  listMensajes(){
    return this.db.collection('mensajes').valueChanges();
  }

  cantPedidos(userId: string){
    return this.db.collection('carShop/', ref => ref
    .where('estado', '==', 'Pendiente')
    .where('usuario', '==', userId)).valueChanges();
   }

   purchasesByBuyer(id: string){
    return this.db.collection('sales/', ref => ref
    .where('comprador', '==', id)).valueChanges();
   }

}
