import { Header } from "@/components/playlist/header";
import { PlaylistTrack } from "@/types/track";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
 
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
			<Header column={column}>
				Album
			</Header>
		),
  },
	{
    accessorKey: "artist",
    header: ({ column }) => (
			<Header column={column}>
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
			<Header column={column}>
				<Clock9 className="ml-auto"/>
			</Header>
		),
		cell: ({ row }) => {
      const duration = parseFloat(row.getValue("duration"))

			const minutes = Math.floor(duration / 60 / 1000);
			const seconds = Math.floor(duration / 1000 % 60);
 
      return <div className="font-medium text-left">{minutes}:{seconds}</div>
    },
  },
	{
		id: 'properties',
    header: () => (
			<Button
				variant="ghost"
				size="sm"
				className="h-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
			>
				<Ellipsis />
			</Button>
		)
	}

]