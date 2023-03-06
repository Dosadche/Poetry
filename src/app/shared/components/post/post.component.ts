import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/crud/users.service';
import { UnsubscriberComponent } from '../unsubscriber/unsubscriber.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends UnsubscriberComponent implements OnInit {
  @Input() postData: Post
  author: User

  constructor(private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.getAuthor()
  }

  private getAuthor(){
    this.usersService.getById(this.postData.createdBy)
    .pipe(takeUntil(this.$destroy))
    .subscribe((user: User) => {
      this.author = user
    })
  }

}
