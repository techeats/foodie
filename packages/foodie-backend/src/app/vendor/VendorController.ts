import { Request, Response } from 'express';
import { Failure, Success } from '../ResponseHandlers';
import * as VendorActions from './VendorActions';

export function GetVendors(req: Request, res: Response) {

  VendorActions.GetVendors()
    .then(result => Success(res, result, 'vendors fetched'))
    .catch(error => Failure(res, error, 'error in fetching vendors'));
}

export function GetVendor(req: Request, res: Response) {
  const { id } = req.params;

  VendorActions.GetVendor(id)
    .then(result => Success(res, result, 'vendors fetched'))
    .catch(error => Failure(res, error, 'error in fetching vendors'));
}
