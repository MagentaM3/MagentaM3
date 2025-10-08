import { PlaylistTrack } from "@/types/PlaylistTrack";
import { ColumnDef } from "@/types/ColumnDef";
import { Clock9 } from "lucide-react";

export const duration: ColumnDef<PlaylistTrack> = {
  meta: "duration",
  accessorKey: "duration",
  header: () => (
    <div>
      <Clock9 className="ml-auto" />
    </div>
  ),
  cell: ({ row }) => {
    const duration = parseFloat(row.getValue("duration"));

    const minutes = Math.floor(duration / 60 / 1000);
    const seconds = Math.floor((duration / 1000) % 60);

    return (
      <div className="font-medium text-right">
        {minutes}:{seconds}
      </div>
    );
  },
};
