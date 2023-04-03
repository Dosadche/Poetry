import { Injectable } from '@angular/core';
import { collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { debounceTime, from, map, Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CrudService<User>{
  collectionName = 'users'
  userChanges: Subject<void> = new Subject<void>()

  get currentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

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
          map((lists: User[]) => 
            lists.length ? lists.filter(user => user.id !== this.currentUser.id) : null
          ))
  }

  handleSubscription(userId: string, unsubscribe = false): Observable<void> {
    const user = this.currentUser
    if(unsubscribe){
      const followingsIds = this.currentUser.followingsIds.filter((id: string) => id !== userId)
      user.followingsIds = followingsIds
    }else{
      user.followingsIds.push(userId)
    }
    return from(this.update(user, user.id)).pipe(tap(() => this.updateStorage(user)))
  }

  private updateStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }
}
