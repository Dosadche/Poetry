import { Injectable } from '@angular/core';
import { fromTask, ref, Storage } from '@angular/fire/storage';
import { on } from 'events';
import { getDownloadURL, uploadBytesResumable, UploadMetadata, UploadResult, UploadTask, UploadTaskSnapshot } from 'firebase/storage';
import { from, fromEvent, map, Observable, of, Subject, switchMap, take } from 'rxjs';

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
  
  public addData(folderName: string): Observable<string>{
    const storageRef = ref(this.storage, `${folderName}/${this.file[0].name}`)
    const uploadedSubject: Subject<UploadTask> = new Subject<UploadTask>()
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, this.file[0])
    uploadTask.on('state_changed', {
      complete: () => {
        uploadedSubject.next(uploadTask.snapshot.task)
      }
    })
    const downloadUrlObservable = uploadedSubject.pipe(
      take(1),
      switchMap((task: UploadTask) => {
        return from(getDownloadURL(task['_ref']))
      }))
    return downloadUrlObservable
  }
}
