import { Component, Input, OnInit } from '@angular/core';
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
  public currentImage = 'https://randomuser.me/api/portraits/lego/0.jpg';
 
  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName:  new FormControl('', Validators.required),
    email:        new FormControl({value:'', disabled: true}, Validators.required),
    photoURL:     new FormControl('', Validators.required),
    imageShow:    new FormControl({value:'', disabled: true}, Validators.required),
  });


  ngOnInit(): void {
      this.authSvc.getUser().then(() => {
      this.initValuesForm(this.authSvc.user! as UserI);
    })
  }

  onSaveUser(user: UserI): void {
    user.photoURL = this.currentImage;
    console.log("onSaveUSER: ", user);
    this.authSvc.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: UserI): void{
    console.log("IMAGE init: ", user.photoURL);
    
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      imageShow: user.photoURL
    })
  }

  handleImage(event: any):void{
    this.image= event.target.files[0];
  }

}
