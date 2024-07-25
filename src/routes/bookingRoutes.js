import express from 'express'
import { carBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/booking', carBooking)
export default router;