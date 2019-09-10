import {  UserData } from './UserData';
import { objectId } from '../../utils';

export async function GetUsers() {
  return UserData().find();
}

export async function GetUser(id) {

  const newId = objectId(id);

  const res = await UserData().findOne({ _id: newId });

  delete res.password;

  return res;
}

export async function UploadProfilePicture() { };