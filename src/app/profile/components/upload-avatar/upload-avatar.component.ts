import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit{
  isLoading: boolean = false
  choosedPhotoUrl: string
  constructor(private uploadService: UploadPhotoService,
              private dialog: MatDialogRef<UploadAvatarComponent>) { }

  ngOnInit(): void {
  }

  chooseFile(event): void {
    this.uploadService.chooseFile(event)
    .subscribe(choosedPhotoUrl => {
      this.choosedPhotoUrl = choosedPhotoUrl
    })
  }

  uploadPhoto(): void {
    this.isLoading = true
    this.uploadService.addData('avatars')
    .subscribe({
      next: ((downloadUrl: string) => {
        this.dialog.close(downloadUrl)
      }),
      error: (() => {
        window.alert('Something went wrong, please, try again')
      }),
      complete: (() => {
        this.isLoading = false
      })
    })
  }
}
