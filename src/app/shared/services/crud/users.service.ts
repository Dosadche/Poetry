import { Injectable } from '@angular/core';
import { collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { debounceTime, map, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User>{
  collectionName = 'users'
  userChanges: Subject<void> = new Subject<void>()
  constructor(firestore: Firestore) {
    super(firestore);
  }

  getBySearchString(searchString: string): Observable<User[]> {
    searchString = searchString.toLowerCase()
    const docsRef = query(this.collectionRef,
        where('nameSurnameLC', '>=', searchString),
        where('nameSurnameLC', '<=', searchString + '\uf8ff'))

    return collectionData(docsRef, { idField: 'id' })
        .pipe(
          map((lists: any[]) => lists.length ? lists : null))
  }
}
