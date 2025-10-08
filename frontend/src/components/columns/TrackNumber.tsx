import { PlaylistTrack } from "@/types/PlaylistTrack";
import { ColumnDef } from "@/types/ColumnDef";

export const trackNumber: ColumnDef<PlaylistTrack> = {
  meta: "track-number",
  accessorKey: "#",
  header: "#",
  cell: ({ row }) => {
    return <div className="text-center">{row.index + 1}</div>;
  },
};
