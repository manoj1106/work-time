'use server';
import { autoInjectable } from 'tsyringe';
import { IDBRepository } from '../db.repository';
import clientPromise from '../../db/mongodb.conn';
import {
  Db,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
  UpdateResult,
} from 'mongodb';

@autoInjectable()
export class DBRepository implements IDBRepository {
  DB_NAME: string | undefined = process.env.DB_NAME;

  public constructor() {}

  /**
   *
   * @returns connection object from database
   *
   */
  private getConnection = async (): Promise<Db> => {
    const err =
      'No connection to database estabilished due to missing connection details.';
    if (!this.DB_NAME) {
      console.log(`getConnection() : ${err}`);
      throw new Error(err);
    }
    const client = await clientPromise;
    const db = client.db(this.DB_NAME);
    return db;
  };

  /**
   *
   * @param collection collection to save data in
   * @param doc  document to save in collection
   * @returns result
   *
   */
  saveDoc = async (
    collection: string,
    doc: any
  ): Promise<InsertOneResult<Document>> => {
    const db = await this.getConnection();
    const result = await db.collection(collection).insertOne(doc);
    return result;
  };

  /**
   *
   * @param collection collection to save data in
   * @param docs documents to save in given collection
   * @returns result
   *
   */
  saveDocs = async (
    collection: string,
    docs: any[]
  ): Promise<InsertManyResult<Document>> => {
    const db = await this.getConnection();
    const result = await db.collection(collection).insertMany(docs);
    return result;
  };

  /**
   *
   * @param collection collection to fetch data from
   * @param filter filter to be used
   * @returns doc document fetched from database
   *
   */
  findDoc = async (collection: string, filter?: any): Promise<any> => {
    const db = await this.getConnection();
    const result = await db.collection(collection).findOne(filter);
    let doc = this.getObject(result);
    return doc;
  };

  /**
   *
   * @param collection collection to fetch data from
   * @param query  query to execute
   * @param projections projections to retrieve data
   * @param sorting sorting to be applied
   * @returns docs
   *
   */
  find = async (
    collection: string,
    query: any,
    projections: any,
    sorting: any
  ): Promise<any> => {
    const db = await this.getConnection();
    const cursor = db
      .collection(collection)
      .find(query, projections)
      .sort(sorting);
    const docs = await this.getDocs(cursor);
    return docs;
  };

  /**
   *
   * @param collection collection to fetch data from
   * @returns docs documents fetched from database
   *
   */
  findDocs = async (collection: string): Promise<any> => {
    const db = await this.getConnection();
    const cursor = db.collection(collection).find();
    const docs = await this.getDocs(cursor);
    return docs;
  };

  /**
   *
   * @param collection collection to update data to
   * @param payload payload to be updated
   * @param id id to be updated
   * @returns updated result
   *
   */
  updateDoc = async (
    collection: string,
    payload: any,
    id: string
  ): Promise<UpdateResult<Document>> => {
    const objectId = new ObjectId(id);
    const db = await this.getConnection();
    const result = await db
      .collection(collection)
      .updateOne({ _id: objectId }, { $set: { ...payload } });
    return result;
  };

  /**
   *
   * @param cursor cursor fetched from database
   * @returns docs
   *
   */
  private getDocs = async (cursor: any) => {
    const docs = [];
    for await (const result of cursor) {
      let doc = this.getObject(result);
      docs.push(doc);
    }
    return docs;
  };

  private getObject = (doc: any) => {
    let result: any = {};
    if (doc) {
      for (const property in doc) {
        if (!doc.hasOwnProperty(property)) continue;
        if (property === 'id') continue;
        if (property === '_id') {
          result['id'] = doc[property].toString();
        } else {
          result[property] = doc[property];
        }
      }
    }
    return result;
  };
}
