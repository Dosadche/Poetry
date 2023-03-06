import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, takeUntil } from 'rxjs';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';
import { UnsubscriberComponent } from '../unsubscriber/unsubscriber.component';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent extends UnsubscriberComponent implements OnInit{
  isLoading: boolean = false
  choosedPhotoUrl: string
  constructor(private uploadService: UploadPhotoService,
              private dialog: MatDialogRef<UploadPhotoComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {
    super();
  }

  ngOnInit(): void { }

  chooseFile(event): void {
    this.uploadService.chooseFile(event)
    .pipe(takeUntil(this.$destroy))
    .subscribe(choosedPhotoUrl => {
      this.choosedPhotoUrl = choosedPhotoUrl
    })
  }

  uploadPhoto(): void {
    this.isLoading = true
    this.uploadService.addData(this.data.folderName)
    .pipe(
      takeUntil(this.$destroy),
      finalize(() => {
        this.isLoading = false
      })
    )
    .subscribe({
      next: (downloadUrl: string) => {
        this.dialog.close(downloadUrl)
      },
      error: () => {
        window.alert('Oops! Something went wrong, please try again😟')
      }
    })
  }
}
