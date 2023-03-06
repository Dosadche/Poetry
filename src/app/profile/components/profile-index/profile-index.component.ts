import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UnsubscriberComponent } from 'src/app/shared/components/unsubscriber/unsubscriber.component';
import { UsersService } from 'src/app/shared/services/crud/users.service';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';
import { UploadPhotoComponent } from '../../../shared/components/upload-photo/upload-photo.component';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent extends UnsubscriberComponent implements OnInit {
  isLoading: boolean = false
  currentUser: User

  constructor(public uploadPhotoService: UploadPhotoService,
              private dialog: MatDialog,
              private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.initializeUser()
  }

  openUploadPhotoModal(): void {
    this.dialog.open(UploadPhotoComponent, {data: {folderName: 'avatars'}})
    .afterClosed()
    .pipe(takeUntil(this.$destroy))
    .subscribe((imageUrl: string) => {
      if(imageUrl){
        this.updateProfileAvatar(imageUrl)
      }
    })
  }

  private updateProfileAvatar(imageUrl: string): void{
    this.isLoading = true
    const changes = {...this.currentUser, avatarUrl: imageUrl}
    this.usersService.update({...this.currentUser, ...{avatarUrl: imageUrl}}, this.currentUser.id)
    .then(() => {
      this.isLoading = false
      localStorage.setItem('user', JSON.stringify(changes))
      this.usersService.userChanges.next()
      this.initializeUser()
    })
  }

  private initializeUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
}
