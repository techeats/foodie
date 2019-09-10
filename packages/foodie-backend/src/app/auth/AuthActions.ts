import { validate } from 'joi';

import { comparePassword, generateToken, ILogin, encryptPassword } from './AuthData';
import { LoginSchema } from './AuthSchema';
import { UserSchema } from '../user/UserSchema';
import { VendorSchema } from '../vendor/VendorSchema';

import { IUser, UserData } from '../user/UserData';
import { IVendor, VendorData } from '../vendor/VendorData';

export async function Login(data: ILogin) {

  const res = await validate(data, LoginSchema);

  const { email, password, type } = res;

  let user: IUser;

  switch (type) {
    case 'user':
      user = await UserData().findOne({ email });
      break;
    case 'vendor':
      user = await VendorData().findOne({ email });
      break;
    default:
      // perhaps no type matches, then we stop the process
      throw new Error('NOT FOUND');
  }

  if (!user) {
    throw new Error('NOT FOUND');
  }

  const passwordCheck = await comparePassword(password, user);

  const token = generateToken(user._id, type, 'Regular');

  Object.assign(user, { token });

  // delete sensitive data on login, try and make this happen from core with projections
  delete user.password;

  return user;
}

export async function SignUpUser(data: IUser) {

  const res = await validate(data, UserSchema);

  const { email, password } = res;

  const doesUserExist = await UserData().findOne({ email });

  if (doesUserExist) {
    throw new Error('user already exists');
  }

  const encryptedPassword = await encryptPassword(password);

  res.password = encryptedPassword;

  const result = await UserData().create(res);

  const token = generateToken(result._id, 'user', 'Regular');

  Object.assign(result, { token });

  delete result.password;

  return result;
}

export async function SignUpVendor(data: IVendor) {

  const res = await validate(data, VendorSchema);

  const { email, password } = res;

  const doesVendorExist = await VendorData().findOne({ email });

  if (doesVendorExist) {
    throw new Error('vendor already exists');
  }

  const encryptedPassword = await encryptPassword(password);

  res.password = encryptedPassword;

  const result = await VendorData().create(res);

  const token = generateToken(result._id, 'user', 'Regular');

  Object.assign(result, { token });

  delete result.password;

  return result;
}

export async function Logout() { }

export async function SendPasswordResetMail(data: IUser) { }

export async function SetPassword(data: IUser) { }
