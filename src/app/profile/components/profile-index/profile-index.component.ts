import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {
  public currentUser: User = JSON.parse(localStorage.getItem('user'))

  constructor(public uploadPhotoService: UploadPhotoService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openUploadPhotoModal(): void {
    this.dialog.open(UploadAvatarComponent)
  }
}
