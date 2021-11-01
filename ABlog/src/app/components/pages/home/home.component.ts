import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  }[]=
  [{
    id:'1',
    titlePost:'Post One',
    contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    imagePost: 'https://picsum.photos/id/237/200/300'
  },
  {
    id:'2',
    titlePost:'Post Two',
    contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    º             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    imagePost: 'https://picsum.photos/200/300'
  },
    {
      id:'3',
      titlePost:'Post Three',
      contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
      imagePost: 'https://picsum.photos/id/10/2500/1667'
    },
    {
      id:'4',
      titlePost:'Post Four',
      contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    º             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
      imagePost: 'https://picsum.photos/id/100/2500/1656'
    }


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
