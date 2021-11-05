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
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
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

  onEditPost(post: PostI){
    console.log('Delete post', post);
    console.log('Title: ', post.titlePost);
    
  }
  
  onDeletePost(post: PostI){
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
            Swal.fire('Deleted!', 'YOur post has been deleted.', 'success');
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

  openDialog():void{
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result ${result}`);
      
    })

  }




}
