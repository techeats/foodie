import { Router } from 'express';
import { Login, SignUpUser, SignUpVendor } from './AuthController';

const router = Router();

router.post('/login', Login);
router.post('/register/user', SignUpUser);
router.post('/register/vendor', SignUpVendor);

export default router;
