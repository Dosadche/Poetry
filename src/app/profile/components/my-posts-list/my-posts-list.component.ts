import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/shared/services/crud/posts.service';

@Component({
  selector: 'app-my-posts-list',
  templateUrl: './my-posts-list.component.html',
  styleUrls: ['./my-posts-list.component.scss']
})
export class MyPostsListComponent implements OnInit{
  currentUser: User
  posts: Post[] = []
  constructor(private postsService: PostsService) { }
  ngOnInit(): void {
    this.initializeUser()
    this.getPosts()
  }
  getPosts(): void {
    this.postsService.getByField('createdBy', this.currentUser.id)
    .pipe(take(1))
    .subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }
  private initializeUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
}
