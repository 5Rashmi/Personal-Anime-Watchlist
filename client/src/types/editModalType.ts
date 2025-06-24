export interface EditFormState {
  notes: string;
  episodesWatched: number | null;
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
