export interface IWrite<T> {
  create(item: T): Promise<T>;
  deactivate(item: object): Promise<object>;
}
