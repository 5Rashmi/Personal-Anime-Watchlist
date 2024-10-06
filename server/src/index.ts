// df3wwC9q6iapgcd6
import express, { Express } from 'express';
import mongoose from 'mongoose';
import animeRecordRouter from './routes/anime-records';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://rr456rashmi:df3wwC9q6iapgcd6@personalizedanimewatchl.yz95y.mongodb.net/?retryWrites=true&w=majority&appName=PersonalizedAnimeWatchlist";

mongoose.connect(mongoURI)
.then(() => console.log("Connected to MongoDB!"))
.catch((err) => console.error('Failed to connect to MongoDB: ', err));

app.use("/anime-records", animeRecordRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
})