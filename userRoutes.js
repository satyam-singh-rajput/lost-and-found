import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUserByRegistrationNo } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/signup', registerUser);

// Check if user exists by registration number
router.get('/api/users/:RegistrationNo', getUserByRegistrationNo);

// Login/auth route
router.post('/auth', authUser);

// Logout route
router.post('/logout', logoutUser);

// Getting the user profile route
router.get('/profile', protect, getUserProfile);

// Updating the user profile route
router.put('/profile', protect, updateUserProfile);

export default router;
