import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColumns } from "@/stores/columnStore";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function ColumnSelector() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);

  const { columns } = useColumns();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Show/Hide Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            onSelect={(e) => e.preventDefault()}
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            {column.meta}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
