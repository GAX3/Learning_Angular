import { Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../../models/post.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private postSvc: PostService) { }

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(posts => this.dataSource.data = posts );
  }

  onNewPost(){
    console.log('New Post');
  }

  onEditPost(post: PostI){
    console.log('Delete post', post);
    console.log('Title: ', post.titlePost);
  }

  
  onDeletePost(post: PostI){
    console.log('Delete ', post);
    console.log('Title: ', post.titlePost);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
