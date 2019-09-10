import { Request, Response } from 'express';
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../auth.middleware';
import { Failure, Success } from '../ResponseHandlers';
import * as AuthActions from './AuthActions';

export function Login(req: Request, res: Response) {

  AuthActions.Login(req.body)
    .then(result => {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
      Success(res, result, 'login successful');
    })
    .catch(error => Failure(res, error, 'error in logging in user'));
}

export function SignUpUser(req: Request, res: Response) {

  AuthActions.SignUpUser(req.body)
    .then(result => {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
      Success(res, result, 'user registered');
    })
    .catch(error => Failure(res, error, 'error in registering user'));
}

export function SignUpVendor(req: Request, res: Response) {

  AuthActions.SignUpVendor(req.body)
    .then(result => {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
      Success(res, result, 'vendor registered');
    })
    .catch(error => Failure(res, error, 'error in registering vendor'));
}
