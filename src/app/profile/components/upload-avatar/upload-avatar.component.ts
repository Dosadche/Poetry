import { Component, OnInit } from '@angular/core';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit{
  fileInput
  constructor(public uploadIleService: UploadPhotoService) { }

  ngOnInit(): void {
    this.fileInput = document.getElementsByClassName('input-file')[0]
    // console.log(this.fileInput.)
  }
}
