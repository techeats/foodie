import { Router } from 'express';
import { GetUser, GetUsers } from './UserController';

const router = Router();

router.get('/users', GetUsers);

router.get('/user/:name/:id', GetUser);

export default router;
