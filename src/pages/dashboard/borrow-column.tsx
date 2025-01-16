"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const cols: ColumnDef<Borrow>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const dueDate = new Date(row.original.borrowUntil);
      const today = new Date();

      return (
        <div className="max-h-[100px] rounded-lg text-left">
          {dueDate == null ? (
            <span className="text-green-500">Returned</span>
          ) : today > dueDate ? (
            <span className="text-red-500">Overdue</span>
          ) : (
            <span className="text-green-500">Borrowing</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Book title",
  },
  {
    accessorKey: "amount",
    header: "Charge",
  },
  {
    accessorKey: "borrowedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Borrowed Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const borrowedAt = new Date(row.original.borrowedAt);

      return (
        <div className="max-h-[100px] rounded-lg text-left">
          {borrowedAt.toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "borrowUntil",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const borrowUntil = new Date(row.original.borrowUntil);

      return (
        <div className="max-h-[100px] rounded-lg text-left">
          {borrowUntil.toDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bookCopy = row.original;

      return (
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
              onClick={() => navigator.clipboard.writeText(bookCopy.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Return book</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
