import { DbEntity } from "./db-entity.model";

export class User extends DbEntity{
    profileId: number
    name: string
    surname: string
    email: string
    password: string
    avatarUrl: string
    followingsIds: string[]
    nameSurnameLC: string
    
    constructor(user: User){
        super()
        this.profileId = 0
        this.name = user.name
        this.surname = user.surname
        this.email = user.email
        this.password = user.password
        this.avatarUrl = '../../assets/images/default-avatar.svg'
        this.followingsIds = []
        this.nameSurnameLC = `${user.name.toLocaleLowerCase()} ${user.surname.toLocaleLowerCase()}`
    }
  }