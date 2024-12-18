import express from "express";
import colors from 'colors';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import connectDb from './config/db.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
dotenv.config();

const PORT = process.env.PORT || 5001;
const app=express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDb();

app.use('/api/v1/user',userRoute);
app.use('/api/v1/post',postRoute);

app.listen(PORT , ()=>{
    console.log(`App is listen on http://localhost:${PORT}`)
})