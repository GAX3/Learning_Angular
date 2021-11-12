import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable} from "rxjs";
import { map, finalize } from 'rxjs/operators';
import { PostI } from "../../shared/models/post.interface";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { doc, getDoc, getFirestore, setDoc, collection} from 'firebase/firestore';
import { FileI } from 'src/app/shared/models/file.interface';
import { update } from '@firebase/database';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private dowloadURL!: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) {
      this.postsCollection = afs.collection<PostI>('posts');    
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

   public deletePostById(post:PostI){
     return this.postsCollection.doc(post.id).delete();
   }


   public editPostById(post: PostI) {
    return this.postsCollection.doc(post.id).update(post);  
  }

   public preAddAndUpdatePost(post: PostI, image: FileI): void{
      this.uploadImage(post, image);
   }

   public savePost(post: PostI){
    console.log('PostSvc', post);

    const postObj ={
        titlePost: post.titlePost,
        contentPost: post.contentPost,
        imagePost: this.dowloadURL,
        fileRef: this.filePath,
        tagsPost: post.tagsPost
    };
       
      if(post.id){
        console.log("TRUE : IF");
        return this.postsCollection.doc(post.id).update(postObj);
      }else{
      // Todo edit
      console.log("FALSE : ELSE");      
      return this.postsCollection.add(postObj); 
     
    }
   }


   public uploadImage(post: PostI, image:FileI){
    let options = "";
    
    if(post.id){
      options = 'edit';
    }else{
      options = 'add';
    }

      this.filePath = `images/${image.name}`;
      
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.dowloadURL = urlImage;
            
            console.log('URL_IMAGE', urlImage);
            console.log('POST', post);
            //CALL addPost();
            this.savePost(post);
            
          });
      })
     ).subscribe();
   }
    
}
