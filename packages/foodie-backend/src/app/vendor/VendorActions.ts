import { VendorData } from './VendorData';
import { objectId } from '../../utils';

export async function GetVendors() {
  return VendorData().find();
}

export async function GetVendor(id) {

  const newId = objectId(id);

  const res = await VendorData().findOne({ _id: newId });

  delete res.password;

  return res;
}
