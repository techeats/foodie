import { validate } from 'joi';
import { IUser, UserData } from '../user/UserData';
import { comparePassword, generateToken, ILogin, encryptPassword } from './AuthData';
import { LoginSchema } from './AuthSchema';
import { RegisterSchema } from '../user/UserSchema';

export async function Login(data: ILogin) {

  const res = await validate(data, LoginSchema);

  const { email, password } = res;

  const user = await UserData().findOne({ email });

  if (!user) {
    throw new Error('NOT FOUND');
  }

  const passwordCheck = await comparePassword(password, user);

  const token = generateToken(user._id);

  Object.assign(user, { token });

  // delete sensitive data on login, try and make this happen from core with projections
  delete user.password;

  return user;
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

export async function Logout() { }

export async function SendPasswordResetMail(data: IUser) { }

export async function SetPassword(data: IUser) { }
