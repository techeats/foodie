import { Router } from 'express';
import { GetUser, GetUsers, SignUpUser } from './UserController';

const router = Router();

router.get('/users', GetUsers);

router.get('/user/:name/:id', GetUser);

router.post('/user/register', SignUpUser);

export default router;
