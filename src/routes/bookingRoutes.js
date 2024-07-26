import express from 'express'
import { carBooking, carBookingById, getAllCarBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/booking', carBooking);
router.get('/bookingById/:id', carBookingById);
router.get('/allBooking', getAllCarBooking);
export default router;   