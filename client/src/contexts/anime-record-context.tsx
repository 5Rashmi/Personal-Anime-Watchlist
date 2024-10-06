import { createContext, useContext, useState } from "react";

interface AnimeRecord {
    id?: string;
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

interface AnimeRecordsContextType {
    records: AnimeRecord[];
    addRecord: (record: AnimeRecord) => void;
    // updateRecord: (id: string, newRecord: AnimeRecord) => void;
    // deleteRecord: (id: string) => void;
}

export const AnimeRecordsContext = createContext<
AnimeRecordsContextType | undefined>(undefined);

export const AnimeRecordsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [records, setRecords] = useState<AnimeRecord[]>([]);
    const addRecord = async (record: AnimeRecord) => {
        console.log('Adding record: ',record);
  
        const response = await fetch("http://localhost:3002/anime-records", {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try{
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            
            }
        } catch (err) {
            console.error('Network or server error: ', err);
        }
    };
    return (
        <AnimeRecordsContext.Provider value={{records, addRecord}}>
            {" "}
            {children}
        </AnimeRecordsContext.Provider>
    );
};

export const useAnimeRecords = () => {
    const context = useContext<AnimeRecordsContextType | undefined>(
        AnimeRecordsContext
    );
    if(!context) {
        throw new Error(
            "useAnimeRecords must be used within a AnimeRecordsProvider"
        );
    }
    return context;
}