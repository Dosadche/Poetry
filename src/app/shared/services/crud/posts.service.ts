import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';
import { CrudService } from './crud.service';
import { Observable, combineLatest, map, merge, of } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends CrudService<Post>{
  collectionName = 'posts';
  constructor(firestore: Firestore,
              private usersService: UsersService) {
    super(firestore);
  }

  getSubscibedPosts(): any {
    const ids = this.usersService.currentUser.followingsIds
    ids.push(this.usersService.currentUser.id)
    const requests: Observable<Post[] | Post>[] = []
    ids.forEach((id: string) => {
      requests.push(this.getByField('createdBy', id, false))
    })
    return combineLatest(requests).pipe(map((posts: Post[]) => 
      posts.flatMap((array) => array)
    ))
  }
}
