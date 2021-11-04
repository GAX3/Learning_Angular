import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { Observable} from "rxjs";
import { map, finalize } from 'rxjs/operators';
import { PostI } from "../../shared/models/post.interface";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { doc, getDoc, getFirestore } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI>;
  
  constructor(
    private afs: AngularFirestore
    ) {
      this.postsCollection = afs.collection('posts');    
    }

    public getAllPosts():Observable<PostI[]>{
      return this.postsCollection
        .snapshotChanges()
        .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
              return {id, ...data};
          })
          )
        );
    }

   public async getOnePost(id: PostI){
     const db= getFirestore();
     const querySnapshot = await getDoc(doc(db, 'posts', `${id}`));
     return querySnapshot.data()
   }

    
}
