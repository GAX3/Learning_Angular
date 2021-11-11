import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { FileI } from '../models/file.interface';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged, signOut, User, updateProfile } from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';
import * as firebase from 'firebase/compat';
import { updateCurrentUser } from '@firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user!:User | null;
  private filePath!: string;
  

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {

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

  preSaveUserProfile(user: UserI, image: FileI): void{
    
    if(image){
      this.uploadImage(user, image);
    }else{
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: UserI, image: FileI): void{
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize (() => {
        fileRef.getDownloadURL().subscribe(urlImage =>{
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      })
    ).subscribe();

  }

  private saveUserProfile(user: UserI) {
    return updateProfile(this.user!,{ displayName: user.displayName, photoURL: user.photoURL});
  }




}




