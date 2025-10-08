import { PlaylistTrack } from "@/types/PlaylistTrack";
import { ColumnDef } from "@/types/ColumnDef";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const album: ColumnDef<PlaylistTrack> = {
  meta: "album",
  accessorKey: "album",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Album
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  },
};
