import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged, signOut, User, updateProfile } from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';
import * as firebase from 'firebase/compat';
import { updateCurrentUser } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user!:User | null;
  

  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.onAuthStateChanged((user) => {
      console.log('USER: ', user);
      if(user){
        this.user = user as User;
        
      }else{
        this.user = null;
      }
    })
  }

  getUser(){
    return new Promise<void>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user as User;
        } else {
          this.user = null;
        }
        resolve()
      })

    });
  }

  async loginByEmail(user: UserI){
    const { email, password } = user;
    const result = await this.afAuth.signInWithEmailAndPassword(email, password!)
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      console.log('USER: ', user);
      if(user){
        this.user = user;
        
      }else{
        this.user = null;
      }
    })
    return result;
  }

  logout(){
    const auth = getAuth();
    signOut(auth).then((user) =>{
      console.log('Sesion cerrada con exito');
    })
    
    onAuthStateChanged(auth, (user) => {
      console.log('USER 2: ', user);
      if(user){
        this.user = user;
      }else{
        this.user = null;
      }
    })
  }

  //* Save User profile


  saveUserProfile(user: UserI) {
    return updateProfile(this.user!,{ displayName: user.displayName, photoURL: user.photoURL});
  }


}




