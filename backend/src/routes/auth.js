import express from 'express';
const router = express.Router();

import auth from '../controllers/auth';
import { verifyAccessToken } from '../helpers/jwt';

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/refresh_token', auth.RefreshToken);
router.post('/logout', auth.Logout);
router.delete("/:id", auth.Delete);
router.get('/me', verifyAccessToken, auth.Me);
router.put("/:id", auth.Update);
router.delete("/:id", auth.Delete);
router.get('/', auth.GetList );


export default router;
