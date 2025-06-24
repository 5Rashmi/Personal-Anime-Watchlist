export interface AnimeRecord {
    _id: string;
    userId: string;
    name: string;
    posterUrl: string;
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