import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { NewAnimeRecord } from "../types/editModalType";

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
  addRecord: (record: NewAnimeRecord) => Promise<void>;
  fetchRecords: () => Promise<void>;
  // updateRecord: (id: string, newRecord: AnimeRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const AnimeRecordsContext = createContext<
  AnimeRecordsContextType | undefined
>(undefined);

export const AnimeRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<AnimeRecord[]>([]);
  const { user } = useUser();
  const url = "https://personal-anime-watchlist-backend.onrender.com";
  // const url = "http://localhost:3002";

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `${url}/anime-records/getAllByUserID/${user?.id}`
    );
    if (response.ok) {
      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
      return newRecord;
    }
    return null;
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: NewAnimeRecord) => {
    const response = await fetch(`${url}/anime-records`, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("Network or server error: ", err);
    }
  };
  return (
    <AnimeRecordsContext.Provider value={{ records, addRecord, fetchRecords }}>
      {" "}
      {children}
    </AnimeRecordsContext.Provider>
  );
};

export const useAnimeRecords = () => {
  const context = useContext<AnimeRecordsContextType | undefined>(
    AnimeRecordsContext
  );
  if (!context) {
    throw new Error(
      "useAnimeRecords must be used within a AnimeRecordsProvider"
    );
  }
  return context;
};
