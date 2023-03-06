import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { pipe, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UnsubscriberComponent } from 'src/app/shared/components/unsubscriber/unsubscriber.component';
import { PostsService } from 'src/app/shared/services/crud/posts.service';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent extends UnsubscriberComponent{
  postForm = new UntypedFormGroup({
    content: new UntypedFormControl(''),
    photoUrl: new UntypedFormControl('')
  })
  previewPhotoUrl: string 
  @Output() isLoading = new EventEmitter<boolean>()
  private currentUser: User = JSON.parse(localStorage.getItem('user'))
  constructor(private postsService: PostsService,
              private uploadPhotoService: UploadPhotoService) {
    super();
  }

  post(): void {
    this.isLoading.emit(true)
    if(this.previewPhotoUrl){
      this.uploadPhotoService.addData('post-images')
      .pipe(takeUntil(this.$destroy))
      .subscribe((photoUrl: string) => {
        this.postForm.patchValue({photoUrl})
        this.createPost()
      })
    } else {
      this.createPost()
    }
  }

  chooseFile(event: Event): void {
    this.uploadPhotoService.chooseFile(event)
    .pipe(takeUntil(this.$destroy))
    .subscribe((previewPhotoUrl: string) => this.previewPhotoUrl = previewPhotoUrl)
  }

  private createPost(): void {
    const post: Post = new Post({...this.postForm.value, createdBy: this.currentUser.id})
    if(!!post.content || !!post.photoUrl){
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
    } else {
      this.isLoading.emit(false)
    }
  }
}
