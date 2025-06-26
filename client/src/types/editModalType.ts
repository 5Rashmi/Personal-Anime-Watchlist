import { AnimeRecord } from "../../../server/src/interface/animeRecordType";

export interface EditFormState {
  notes: string;
  episodesWatched: number | null;
  totalEpisodes: number | null;
  watchStatus: string;
  rating: number | null;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editForm: EditFormState;
  setEditForm: React.Dispatch<React.SetStateAction<EditFormState>>;
  handleUpdate: () => void;
}

export type NewAnimeRecord = Omit<AnimeRecord, "_id">;

