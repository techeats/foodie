import { Router } from 'express';
import { Login, SignUpUser } from './AuthController';

const router = Router();

router.post('/login', Login);
router.post('/register', SignUpUser);

export default router;
