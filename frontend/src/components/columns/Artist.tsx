import { PlaylistTrack } from "@/types/PlaylistTrack";
import { ColumnDef } from "@/types/ColumnDef";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const artist: ColumnDef<PlaylistTrack> = {
  meta: "artist",
  accessorKey: "artist",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Artist
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
  cell: ({ row }) => {
    const artists: string[] = row.getValue("artist");
    return artists.join(",  ");
  },
};
