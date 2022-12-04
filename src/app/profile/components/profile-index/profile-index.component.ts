import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UploadPhotoService } from 'src/app/shared/services/upload-photo.service';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {
  public currentUser: User = JSON.parse(localStorage.getItem('user'))
  file: any
  fileName: string;

  constructor(public uploadPhotoService: UploadPhotoService) { }

  ngOnInit(): void {
  }

  addData(){
    this.uploadPhotoService.addData()
    .subscribe(res => console.log(res))
  }
}
