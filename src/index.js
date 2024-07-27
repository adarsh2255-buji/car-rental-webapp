import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import carRouter from './routes/carRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 3000;


connectDb()
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(userRouter)
app.use(carRouter)
app.use(bookingRouter)
app.use(adminRouter)
app.get('/', (req, res) => {
  res.send(`Hello world`);
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
