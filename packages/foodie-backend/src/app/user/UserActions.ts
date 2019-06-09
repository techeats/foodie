import { validate } from 'joi';
import { ObjectID } from 'mongodb';
import { encryptPassword, generateToken } from '../auth/AuthData';
import { IUser, UserData } from './UserData';
import { RegisterSchema } from './UserSchema';

export async function GetUsers() {

  return UserData().find();

}

export async function GetUser(id) {

  const newId = new ObjectID(id);

  const res = await UserData().findOne({ _id: newId });

  delete res.password;

  return res;

}

export async function SignUpUser(data: IUser) {

  const res = await validate(data, RegisterSchema);

  const { email, password } = res;

  const doesUserExist = await UserData().findOne({ email });

  if (doesUserExist) {
    throw new Error('user already exists');
  }

  const encryptedPassword = await encryptPassword(password);

  res.password = encryptedPassword;

  const result = await UserData().create(res);

  const token = generateToken(result._id);

  Object.assign(result, { token });

  delete result.password;

  return result;

}

export async function UploadProfilePicture() {

};