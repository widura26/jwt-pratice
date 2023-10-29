import express from 'express';
import router from './routes/userRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

try {
    mongoose.connect("mongodb://localhost:27017/jwt-trial-pratice", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("connected to db");
} catch (error) {
    console.error('something went wrong');
}

process.on('unhandledRejection', err => {
    console.log('unhandledRejection', err.message);
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use([ router ]);

app.listen(4000, () => {
    console.log('Server is live on!');
})