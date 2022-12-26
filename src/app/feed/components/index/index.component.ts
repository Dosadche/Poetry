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
  isLoading: boolean = false

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  handleLoading(event): void {
    this.isLoading = event
  }

  private getPosts(): void {
    this.postsService.getAll()
    .subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }
}
