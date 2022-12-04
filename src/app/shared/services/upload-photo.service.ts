import { Injectable } from '@angular/core';
import { fromTask, ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { from, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {
  file: any = {}
  fileName: string = ''

  constructor(private storage: Storage) { }

  public chooseFile(event): void {
    this.file = event.target.files;
  }
  public addData(): Observable<string> {
    const storageRef = ref(this.storage, 'avatars/'+this.file[0].name)
    const uploadTask = fromTask(uploadBytesResumable(storageRef, this.file[0]))
    const downloadUrlObservable = uploadTask.pipe(
      take(1),
      switchMap(task => from(getDownloadURL(task.ref))))
    return downloadUrlObservable
  }
}
