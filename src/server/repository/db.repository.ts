import { InsertManyResult, InsertOneResult, UpdateResult } from 'mongodb';

export interface IDBRepository {
  saveDoc(collection: string, doc: any): Promise<InsertOneResult<Document>>;
  saveDocs(
    collection: string,
    docs: any[]
  ): Promise<InsertManyResult<Document>>;

  updateDoc(
    collection: string,
    payload: any,
    id: string
  ): Promise<UpdateResult<Document>>;

  findDoc(collection: string, filter?: any): Promise<any>;
  find(
    collection: string,
    query: any,
    projections: any,
    sorting: any
  ): Promise<any>;
  findDocs(collection: string): Promise<any>;
}
