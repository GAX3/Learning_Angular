import { Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id','titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})  paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(posts => this.dataSource.data = posts );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  onDeletePost(post: PostI){
    console.log('ID', post.id);   
    console.log('Title: ', post.titlePost);

    Swal.fire({
      title: 'Are you sure?',
      text:  `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#33085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it!`
    }).then(result => {
        console.log(result);
        if(result.value){
           this.postSvc.deletePostById(post).then(() => {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
           }).catch((error) =>{
             Swal.fire('Error!', 'There was a error deleting this post', 'error');
           });
        }else{
          console.log("CANCEL");
        }
    });
  }

  onNewPost(){
    this.openDialog();
  }

  onEditPost(post: PostI){
    //Test Console helps to watch proccess
    //this.consoleTest(post);
    console.log('Edit post:: ', post);
        
    this.openDialog(post);

  }

  onTest(post: PostI){
    console.log("");
    console.log('ID: ', post.id);
    console.log('Title: ', post.titlePost);
    console.log('Content: ', post.contentPost);
    console.log('Tags: ', post.tagsPost);
    console.log('Image: ', post.imagePost);
    console.log("");
    
  }

  consoleTest(post: PostI){
    console.log('Edit Post', post  );
    console.log('IMAGE', post.imagePost);
    let imageO = post.imagePost;
    console.log('imageO', imageO);

    let imageSub = imageO.substring(8, (imageO.length-1));
    post.imagePost = imageSub;
    console.log("PI: ", post.imagePost);
  }

  openDialog(post?: PostI):void{
    console.log("Open Dialog");
  
    const config ={
      data:{
      message: post ? 'Edit Post' : 'New Post',
      content: post
    }
  };
  
  console.log("Method: ", config.data.message);
  
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result ${result}`);
      
    });

  }
  
}
