import { DbConnection } from '../../connection';
import VendorRepository from './VendorRepository';

const COLLECTION_NAME = 'vendors';

export function VendorData(): VendorRepository {

  try {
    return new VendorRepository(DbConnection(), COLLECTION_NAME);
  } catch (ex) {
    throw ex;
  }
}

export interface IVendor {
  _id?: string;
  token?: string;
  name: string;
  email: string;
  password: string;
};
