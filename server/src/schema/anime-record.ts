import mongoose, { Schema } from "mongoose";
import { AnimeRecord } from "../interface/animeRecordType";

const animeRecordSchema = new mongoose.Schema<AnimeRecord>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true }, 
    posterUrl: { type: String, required: false},
    description: { type: String, required: false },
    genre: { type: [String], required: true },
    year: { type: Number, required: false },
    status: { type: String, required: false },
    totalEpisodes: { type: Number, required: false, default: null },
    episodesWatched: { type: Number, required: true },
    watchStatus: { type: String, required: true },
    dateOfCompletion: { type: Date, required: false },
    rating: { type: Number, required: true },
    notes: { type: String, required: false },
}, { timestamps: true });

const animeRecordModel = mongoose.model<AnimeRecord>('AnimeRecord', animeRecordSchema);

export default animeRecordModel;