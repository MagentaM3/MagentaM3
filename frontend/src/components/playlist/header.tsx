import { PlaylistTrack } from "@/types/track"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, Check, ChevronsUpDown, EyeOff } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"
 
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
	column: ColumnDef<PlaylistTrack>,
	children: ReactNode,
}

export const Header = ({ column, children }: HeaderProps) => {
	return (
		<div className="flex items-center space-x-2 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex justify-between w-full px-2 gap-4"
          >
            <span className="px-1">{ children }</span>
						{column.getIsSorted() === "desc" ? (
							<ArrowDown />
						) : column.getIsSorted() === "asc" ? (
							<ArrowUp />
						) : (
							<ChevronsUpDown />
						)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem 
						onClick={() => column.getIsSorted() ? column.clearSorting() : column.toggleSorting(false)}
						className="hover:cursor-pointer"
					>
						<div className="flex justify-between w-full">
							<div className="flex">
								<ArrowUp className="h-3.5 w-3.5 my-auto mr-1" />
								Asc
							</div>
							{ column.getIsSorted() === "asc" && <Check /> }
						</div>
          </DropdownMenuItem>
          <DropdownMenuItem 
						onClick={() => column.getIsSorted() ? column.clearSorting() : column.toggleSorting(true)}
						className="hover:cursor-pointer"
					>
						<div className="flex justify-between w-full">
							<div className="flex">
								<ArrowDown className="h-3.5 w-3.5 my-auto mr-1" />
								Desc
							</div>
							{ column.getIsSorted() === "desc" && <Check /> }
						</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
						onClick={() => column.toggleVisibility(false)} 
						className="hover:cursor-pointer"
					>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
	)
}