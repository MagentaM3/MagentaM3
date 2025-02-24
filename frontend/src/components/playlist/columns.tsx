import { Header } from "@/components/playlist/header";
import { PlaylistTrack } from "@/types/track";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9 } from "lucide-react";
 
export const columns: ColumnDef<PlaylistTrack>[] = [
	{
    accessorKey: "image",
		header: "",
    cell: ({ row }) => <img width={50} style={{ borderRadius: "5px"}} src={row.getValue("image")} />,
		enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
			<Header column={column}>
				Title
			</Header>
		),
  },
  {
    accessorKey: "album",
    header: ({ column }) => (
			<Header column={column} sortable>
				Album
			</Header>
		),
  },
	{
    accessorKey: "artist",
    header: ({ column }) => (
			<Header column={column} sortable>
				Artist(s)
			</Header>
		),
		cell: ({ row }) => {
      const artists: string[] = row.getValue("artist");
      return artists.join(',  ')
    },
  },
	{
    accessorKey: "duration",
    header: ({ column }) => (
			<Header column={column} sortable>
				< Clock9 className="ml-auto"/>
			</Header>
		),
		cell: ({ row }) => {
      const duration = parseFloat(row.getValue("duration"))

			const minutes = Math.floor(duration / 60 / 1000);
			const seconds = Math.floor(duration / 1000 % 60);
 
      return <div className="font-medium text-right">{minutes}:{seconds}</div>
    },
  },
]