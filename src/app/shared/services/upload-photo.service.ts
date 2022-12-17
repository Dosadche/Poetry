import { Injectable } from '@angular/core';
import { fromTask, ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { from, fromEvent, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {
  file: any = {}
  fileName: string = ''

  constructor(private storage: Storage) { }

  public chooseFile(event): Observable<string> {
    const fileReader = new FileReader()
    this.file = event.target.files;
    fileReader.readAsDataURL(event.target.files[0])
    return fromEvent(fileReader, 'load').pipe(map(res => res.target['result']))
  }
  
  public addData(folderName: string): Observable<string> {
    const storageRef = ref(this.storage, `${folderName}/${this.file[0].name}`)
    const uploadTask = fromTask(uploadBytesResumable(storageRef, this.file[0]))
    const downloadUrlObservable = uploadTask.pipe(
      take(1),
      switchMap(task => from(getDownloadURL(task.ref))))
    return downloadUrlObservable
  }
}
