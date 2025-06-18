import express, { Express } from 'express';
import mongoose from 'mongoose';
import animeRecordRouter from './routes/anime-records';
import cors from 'cors';
import dotenv from 'dotenv';

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

mongoose.connect(mongoURI || "")
.then(() => console.log("Connected to MongoDB!"))
.catch((err) => console.error('Failed to connect to MongoDB: ', err));

app.use("/anime-records", animeRecordRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(process.env.BASE_URL);
})