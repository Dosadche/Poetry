import { Injectable } from '@angular/core';
import { collectionData, DocumentData, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { combineLatest, filter, map, merge, Observable, Subject, switchMap } from 'rxjs';
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
        where('lowerCaseName', '>=', searchString),
        where('lowerCaseName', '<=', searchString + '\uf8ff'),
        orderBy('lowerCaseName'))
    const docsRef2 = query(this.collectionRef,
        where('lowerCaseSurname', '>=', searchString), 
        where('lowerCaseSurname', '<=', searchString + '\uf8ff'),
        orderBy('lowerCaseSurname'))
    const mergedRefs: Observable<DocumentData>[] = [
        collectionData(docsRef,  { idField: 'id' }),
        collectionData(docsRef2,  { idField: 'id' }),
    ]
    return merge(mergedRefs).pipe(
        switchMap((lists) => lists),
        filter((res) => !!res.length),
        map((lists: User[]) => lists || undefined))
  }
}
