import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 3000;


connectDb()
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(userRouter)
app.get('/', (req, res) => {
  res.send(`Hello world`);
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
