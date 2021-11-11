import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  //public posts$!: Observable<PostI[]>;
  
  @Input()  post!: PostI;

  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    //this.posts$ = this.postSvc.getAllPosts();


  }

}

