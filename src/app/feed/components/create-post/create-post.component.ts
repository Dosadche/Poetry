import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/shared/services/crud/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm = new UntypedFormGroup({
    content: new UntypedFormControl(''),
    photoUrl: new UntypedFormControl('')
  })
  previewPhotoUrl: string 
  private currentUser: User = JSON.parse(localStorage.getItem('user'));
  constructor(private postsService: PostsService,
              private uploadPhotoService: UploadPhotoService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const newPost: Post = new Post({
      content: this.postForm.value.content,
      photoUrl: this.postForm.value.photoUrl,
      createdBy: this.currentUser.id,
    })
    this.postsService.create(newPost)
    .catch((err) => {
      window.alert(err)
    })
  }

  chooseFile(event): void {
    this.uploadPhotoService.chooseFile(event)
    .subscribe((previewPhotoUrl: string) => this.previewPhotoUrl = previewPhotoUrl)
  }
}
