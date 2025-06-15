import express from 'express';
import { loginUser, registerUser } from '../controller/user.controller.js';
import { userAuthentication } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser)
router.post('/apiAuth',userAuthentication)


export default router;