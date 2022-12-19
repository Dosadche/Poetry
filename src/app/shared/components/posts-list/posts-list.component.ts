import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnChanges{
  @Input() posts: Post[]
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.posts.currentValue){
      this.posts = this.sortedPosts
      console.log(this.sortedPosts)
    }
  }

  ngOnInit(): void { }

  get sortedPosts(): Post[] {
    return this.posts.sort((a, b) => b.createdAt['seconds'] - a.createdAt['seconds'])
  }
}
