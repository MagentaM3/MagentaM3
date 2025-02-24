import { PlaylistTrack } from "@/types/track"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"

interface HeaderProps {
	column: ColumnDef<PlaylistTrack>,
	children: ReactNode,
	sortable: boolean
}

export const Header = ({ column, children }: HeaderProps) => {
	if (!column.getCanSort()) {
    return <div>{ children } </div>
  }

	return  (
		<Button
			className="w-full"
			variant="ghost"
			onClick={() => {
				column.toggleSorting()
			}}
		>
			<div className="flex justify-between w-full gap-2">
			{ children }
			{ column.getIsSorted() === "desc" ? (
				<ArrowDown />
				) : column.getIsSorted() === "asc" ? (
					<ArrowUp />
				) : (
					<ChevronsUpDown />
				)}
			</div>
		</Button>
	)
}