import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() isLoading = new EventEmitter<boolean>()
  private currentUser: User = JSON.parse(localStorage.getItem('user'))
  constructor(private postsService: PostsService,
              private uploadPhotoService: UploadPhotoService) { }

  ngOnInit(): void {
  }

  post(): void {
    this.isLoading.emit(true)
    if(this.previewPhotoUrl){
      this.uploadPhotoService.addData('post-images')
      .subscribe((photoUrl: string) => {
        this.postForm.patchValue({photoUrl})
        this.createPost()
      })
    } else {
      this.createPost()
    }
  }

  chooseFile(event): void {
    this.uploadPhotoService.chooseFile(event)
    .subscribe((previewPhotoUrl: string) => this.previewPhotoUrl = previewPhotoUrl)
  }

  private createPost(): void {
    const post: Post = new Post({...this.postForm.value, createdBy: this.currentUser.id})
    this.postsService.create(post)
    .then(() => {
      this.previewPhotoUrl = ''
      this.postForm.setValue({
        content: '',
        photoUrl: '',
      })
    })
    .catch((err) => {
      window.alert(err)
    })
    .finally(() => {
      this.isLoading.emit(false)
    })
  }
}
