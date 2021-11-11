import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../../posts/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public posts$: Observable<PostI[]> | undefined;

  constructor(private postSvc: PostService){}
  
  ngOnInit(): void {
    this.posts$ = this.postSvc.getAllPosts();
  }

  

}
