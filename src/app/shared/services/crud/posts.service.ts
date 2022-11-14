import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends CrudService<Post>{
  collectionName = 'posts';
  constructor(firestore: Firestore) {
    super(firestore);
  }
}
