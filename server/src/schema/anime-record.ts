import mongoose, { Schema } from "mongoose";

interface AnimeRecord {
    userId: string;
    name: string;
    description: string;
    genre: string[];
    year?: number | null;
    status?: string;
    totalEpisodes: number;
    episodesWatched: number;
    watchStatus: string;
    dateOfCompletion?: Date;
    rating: number;
    notes?: string;
}

const animeRecordSchema = new mongoose.Schema<AnimeRecord>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    year: { type: Number, required: false },
    status: { type: String, required: false },
    totalEpisodes: { type: Number, required: true },
    episodesWatched: { type: Number, required: true },
    watchStatus: { type: String, required: true },
    dateOfCompletion: { type: Date, required: false },
    rating: { type: Number, required: true },
    notes: { type: String, required: false },
});

const animeRecordModel = mongoose.model<AnimeRecord>('AnimeRecord', animeRecordSchema);

export default animeRecordModel;