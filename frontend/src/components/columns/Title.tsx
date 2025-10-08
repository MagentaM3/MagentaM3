import { PlaylistTrack } from "@/types/PlaylistTrack";
import { ColumnDef } from "@/types/ColumnDef";

export const title: ColumnDef<PlaylistTrack> = {
  meta: "title",
  header: "Title",
  cell: ({ row }) => {
    console.log(row);
    return (
      <>
        <img
          width={50}
          style={{ borderRadius: "5px" }}
          src={row.original.image}
        />
        {row.original.title}
      </>
    );
  },
};
