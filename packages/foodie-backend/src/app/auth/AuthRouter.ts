import { Router } from 'express';
import { Login } from './AuthController';

const router = Router();

router.post('/login', Login);

export default router;
