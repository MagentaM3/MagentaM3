import { ColumnDef } from "@tanstack/react-table"
import { Clock9 } from "lucide-react"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PlaylistTrack = {
  id: string
	title: string
	album: string
	artist: string[]
	duration: number
	image: string
}
 
export const columns: ColumnDef<PlaylistTrack>[] = [
	{
    accessorKey: "image",
    header: "",
    cell: ({ row }) => <img width={50} style={{ borderRadius: "5px"}} src={row.getValue("image")} />
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "album",
    header: "Album",
  },
	{
    accessorKey: "artist",
    header: "Artist",
		cell: ({ row }) => {
      const artists: string[] = row.getValue("artist");
      return artists.join(',  ')
    },
  },
	{
    accessorKey: "duration",
    header: () => <div >< Clock9 className="ml-auto"/></div>,
		cell: ({ row }) => {
      const duration = parseFloat(row.getValue("duration"))

			const minutes = Math.floor(duration / 60 / 1000);
			const seconds = Math.floor(duration / 1000 % 60);
 
      return <div className="font-medium text-right">{minutes}:{seconds}</div>
    },
  },
]