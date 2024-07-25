import express from 'express'
import upload from '../config/cloudinary.js';
import { createCar, getCarById } from '../controllers/carController.js';

const router = express.Router();

router.post('/createCar',createCar);
router.get('/getCar/:id',getCarById);



export default router;
