import express from 'express'
import userController from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', userController.userRegister);
router.post('/signin', userController.userSignIn);
router.post('/signout', userController.userSignOut);
router.get('/profile',protect, userController.getUserProfile);

export default router;
 