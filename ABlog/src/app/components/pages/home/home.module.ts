import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatCardModule} from "@angular/material/card";
import { MaterialModule} from "../../../material.module";
import { PostComponent } from '../../posts/post/post.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MaterialModule
  ]
})
export class HomeModule { }
