import { Collection, Db, ObjectID } from 'mongodb';
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

  public readonly collection: Collection;

  constructor(db: Db, collectionName: string) {

    this.collection = db.collection(collectionName);

  }

  public async create(item: T): Promise<T> {

    const itemWithDate = Object.assign(item, { createdAt: new Date() });

    const result = await this.collection.insertOne(itemWithDate);

    return result.ops[0];

  }

  public async find(query?: object, filter?: object): Promise<T[]> {

    return this.collection.find(query, filter).toArray();

  }

  public async findOne(query?: object, filter?: object): Promise<T> {

    return this.collection.findOne(query, filter);

  }

  public async deactivate(documentId: ObjectID): Promise<any> {

    const updateResult = await this.collection.findOneAndUpdate(
      { _id: documentId },
      {
        $set: {
          active: false,
        },
      },
      {
        returnOriginal: false,
      },
    );

    return updateResult.value;

  }
}
