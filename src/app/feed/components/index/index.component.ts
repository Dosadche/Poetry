import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/shared/services/crud/posts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  posts: Post[]

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  private getPosts(): void {
    this.postsService.getAll()
    .subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

}
