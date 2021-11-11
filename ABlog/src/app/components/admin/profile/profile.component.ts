import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserI } from 'src/app/shared/models/user.interface';
import { FileI } from 'src/app/shared/models/file.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image! : FileI;
  public currentImage!: string;

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName:  new FormControl('', Validators.required),
    email:        new FormControl({value:'', disabled: true}, Validators.required),
    photoURL:     new FormControl('', Validators.required)
  });


  ngOnInit(): void {
    this.authSvc.getUser().then(() => {
      this.initValuesForm(this.authSvc.user! as UserI);
    })
  }

  onSaveUser(user: UserI): void {
    console.log("onSaveUSER: ", user);

    this.authSvc.saveUserProfile(user);
  }

  private initValuesForm(user: UserI): void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }else{
      this.currentImage ="https://picsum.photos/id/113/150/150"
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
  }

}
