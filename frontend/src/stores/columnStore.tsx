import {
  album,
  artist,
  duration,
  title,
  trackNumber,
} from "@/components/columns";
import { ColumnDef } from "@/types/ColumnDef";
import { PlaylistTrack } from "@/types/PlaylistTrack";
import { create } from "zustand";

interface ColumnState {
  columns: ColumnDef<PlaylistTrack>[];
}

export const useColumns = create<ColumnState>((set) => ({
  columns: [trackNumber, title, artist, album, duration],
}));
