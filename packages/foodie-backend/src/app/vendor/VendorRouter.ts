import { Router } from 'express';
import { GetVendor, GetVendors } from './VendorController';

const router = Router();

router.get('/vendors', GetVendors);

router.get('/vendor/:name/:id', GetVendor);

export default router;
