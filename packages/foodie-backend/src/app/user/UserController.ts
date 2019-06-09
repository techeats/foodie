import { Request, Response } from 'express';
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../auth.middleware';
import { Failure, Success } from '../ResponseHandlers';
import * as UserActions from './UserActions';

export function GetUsers(req: Request, res: Response) {

  UserActions.GetUsers()
    .then(result => Success(res, result, 'users fetched'))
    .catch(error => Failure(res, error, 'error in fetching users'));

}

export function GetUser(req: Request, res: Response) {
  const { id } = req.params;

  UserActions.GetUser(id)
    .then(result => Success(res, result, 'user fetched'))
    .catch(error => Failure(res, error, 'error in fetching user'));

}

export function SignUpUser(req: Request, res: Response) {

  UserActions.SignUpUser(req.body)
    .then(result => {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
      Success(res, result, 'user registered');
    })
    .catch(error => Failure(res, error, 'error in registering user'));

}
