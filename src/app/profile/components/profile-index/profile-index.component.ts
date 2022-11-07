import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {
  public currentUser: User = JSON.parse(localStorage.getItem('user'))
  file: any
  fileName: string;

  constructor(private storage: Storage) { }

  ngOnInit(): void {
  }

  public chooseFile(event: any): void {
    this.file = event.target.files;
  }
  private addData(){
    const storageRef = ref(this.storage, this.file.name)
    const uploadTask = uploadBytesResumable(storageRef, this.file)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
      console.log(progress,'%')
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(downloadUrl => {
        console.log(downloadUrl)
      })
    })
  }
}
