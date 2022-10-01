import { DbEntity } from "./db-entity.model";

export class Post extends DbEntity{
    //Post: id, createdAt, name, photoUrl, text, userId
    name: string
    userId: string
    photoUrl?: string
    content: string

    constructor(post: Post){
        super()
        this.name = post.name
        this.userId = post.userId
        this.content = post.content
    }
  }