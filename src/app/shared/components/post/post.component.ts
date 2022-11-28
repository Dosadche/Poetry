import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/crud/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postData: Post
  author: User

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAuthor()
  }

  private getAuthor(){
    this.usersService.getById(this.postData.createdBy)
    .subscribe((user: User) => {
      this.author = user
    })
  }

}
