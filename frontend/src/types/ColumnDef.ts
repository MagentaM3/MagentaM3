import { ColumnDef as TanStackColumnDef } from "@tanstack/react-table";

export type ColumnDef<T> = TanStackColumnDef<T> & { meta: string };
