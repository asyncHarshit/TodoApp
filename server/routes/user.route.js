import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
import { userAuthentication } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser)
router.post('/apiAuth',userAuthentication)
router.post('/logout',logoutUser);


export default router;