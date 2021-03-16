import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore) {
    this.userData$ = afAuth.authState;
  }

  login(email: string, password: string){
    try{
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  register(email: string, password: string){
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  loginFacebook(){
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
   }

   loginGoogle(){
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
   }

   verifyUser(idUser: string){
    return this.db.collection('users', ref => ref
                  .where('id', '==', idUser))
                  .valueChanges();
  }

  createUserData(id: string, user: any){
    return this.db.collection<User>('users').doc(id).set(user);
  }
  logout(){
    try {
      this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  updateInfoUser(idUser: string, info: any){
    return this.db.collection('users').doc(idUser).update({datos: info});
  }

  loadInfoUser(idUser: string){
    return this.db.collection('users').doc(idUser).valueChanges();
  }

  resetPassword(email: string){
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }
}
