import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { UnsubscriberComponent } from 'src/app/shared/components/unsubscriber/unsubscriber.component';
import { PostsService } from 'src/app/shared/services/crud/posts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends UnsubscriberComponent implements OnInit {
  posts: Post[]
  isLoading: boolean = false

  constructor(private postsService: PostsService) {
    super();
  }

  ngOnInit(): void {
    this.getPosts()
  }

  handleLoading(event): void {
    this.isLoading = event
  }

  private getPosts(): void {
    this.isLoading = true
    this.postsService.getSubscibedPosts()
    .pipe(takeUntil(this.$destroy))
    .subscribe((posts: Post[]) => {
      this.posts = posts
      this.isLoading = false
    }, () => this.isLoading = false)
  }
}
