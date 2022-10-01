import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends CrudService<User>{
  collectionName = 'users'
  constructor(firestore: Firestore) {
    super(firestore);
  }
}
