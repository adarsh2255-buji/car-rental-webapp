import express from 'express'
import { cancelBooking, carBooking, carBookingById, getAllCarBooking } from '../controllers/bookingController.js'
import protect from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/booking',protect, carBooking);
router.get('/bookingById/:id', protect, carBookingById);
router.get('/allBooking', protect, getAllCarBooking);
router.put('/cancel/:bookingId',protect, cancelBooking);
export default router;   