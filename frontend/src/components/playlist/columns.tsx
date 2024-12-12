import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Clock9, MoreHorizontal } from "lucide-react"


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
    cell: ({ row }) => <img width={50} style={{ borderRadius: "5px" }} src={row.getValue("image")} />
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
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
      )
    },
  },
  {
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
      )
    },
    cell: ({ row }) => {
      const artists: string[] = row.getValue("artist");
      return artists.join(',  ')
    },
  },
  {
    accessorKey: "duration",
    header: () => <div >< Clock9 className="ml-auto" /></div>,
    cell: ({ row }) => {
      const duration = parseFloat(row.getValue("duration"))

      const minutes = Math.floor(duration / 60 / 1000);
      const seconds = Math.floor(duration / 1000 % 60);

      return <div className="font-medium text-right">{minutes}:{seconds}</div>
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const track = row.original

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(track.id)}
              >
                Copy track ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(track.id)}
              >
                Delete track
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]