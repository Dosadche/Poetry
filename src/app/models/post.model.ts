import { DbEntity } from "./db-entity.model";

export class Post extends DbEntity{
    createdBy: string
    photoUrl?: string
    content: string

    constructor(post: Partial<Post>){
        super()
        this.createdBy = post.createdBy
        this.photoUrl = post.photoUrl || ''
        this.content = post.content
    }
  }