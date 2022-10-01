export class DbEntity {
    id?: string;
    createdAt?: Date;
    constructor() {
      this.createdAt = new Date();
    }
  }