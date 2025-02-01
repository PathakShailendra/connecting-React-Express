const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', userController.signUp);
router.post('/login', userController.signIn);
router.post('/logout', userController.logout);
router.get('/profile', authMiddleware.isAuthenticated , userController.getProfile);


module.exports = router;