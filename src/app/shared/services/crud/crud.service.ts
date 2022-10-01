import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, query, updateDoc, where } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DbEntity } from 'src/app/models/db-entity.model';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends DbEntity>{
  abstract collectionName: string;

  constructor(public firestore: Firestore) { }

  private get collectionRef(): CollectionReference {
      return collection(this.firestore, this.collectionName)
  }

  public create(doc: T): Promise<DocumentReference<DocumentData>> {
      return addDoc(this.collectionRef, { ...doc })
  }

  public read(): Observable<any[] | null> {
      const clientRef = query(this.collectionRef);
      return collectionData(clientRef, { idField: 'id' })
          .pipe(map((lists: any[]) => lists.length ? lists : null));
  }

  public update(entity: T, id: string): Promise<void> {
      const docRef = doc(this.firestore, this.collectionName, id);
      const newObject: any = { ...entity };
      return updateDoc(docRef, newObject);
  }

  public delete(id: string): Promise<void> {
      const docRef = doc(this.firestore, this.collectionName, id);
      return deleteDoc(docRef);
  }

  public getAll(): Observable<DocumentData[]> {
      const docsRef = collection(this.firestore, this.collectionName)
      return collectionData(docsRef, { idField: 'id' }).pipe(
          map((lists: T[]) => {
              return lists || undefined
          })
      )
  }

  getById(id: string): Observable<T> {
      const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
      return docData(docRef, { idField: 'id' }).pipe(
          mergeMap((list: T) => {
              return of(list);
          })
      );
  }

  getByField(field: any, value: any, unique: boolean = false, fieldIsArray: boolean = false): Observable<T | T[]> {
      if (!field) {
          return of(undefined);
      }
      let docsRef;
      if (fieldIsArray) {
          docsRef = query(this.collectionRef, where(field, "array-contains", value));
      }
      else {
          docsRef = query(this.collectionRef, where(field, "==", value));
      }
      return collectionData(docsRef, { idField: 'id' }).pipe(
          map((lists: T[]) => {
              if (unique) {
                  return lists.length ? lists[0] : null;
              }
              return lists || undefined;
          })
      );
  }

  getByTwoFields(firstField: any, firstValue: any, secondField: any, secondValue: any, unique: boolean = false): Observable<T | T[]> {
      if (!firstField || !secondField) {
          return of(undefined);
      }
      let docsRef = query(this.collectionRef, where(firstField, "==", firstValue), where(secondField, "==", secondValue));
      return collectionData(docsRef, { idField: 'id' }).pipe(
          map((lists: T[]) => {
              if (unique) {
                  return lists.length ? lists[0] : null;
              }
              return lists || undefined;
          })
      );
  }
}

