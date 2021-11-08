import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

/*Fire*/
import { AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AngularFireStorageModule} from "@angular/fire/compat/storage";
import { BUCKET } from "@angular/fire/compat/storage";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule} from "@angular/fire/compat";
import { MatFormFieldModule} from '@angular/material/form-field';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NewPostModule,
    MaterialModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
    
  ],
  entryComponents: [ModalComponent],
  providers: [
    {provide: BUCKET, useValue:'gs://angular-2d923.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
