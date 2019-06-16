export interface IRead<T> {
  find(query: object, filter: object): Promise<T[]>;
  findOne(query: object, filter: object): Promise<T>;
}
