import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../components/ui/checkbox";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BookCartItem } from "../../redux/slices/cartSlice";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<BookCartItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: () => <div className="text-left">Image</div>,
    cell: ({ row }) => {
      const image = row.original.book.imageUrl as string;

      return <img className="max-h-[100px] rounded-lg" src={image} />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.book.title as string;
      const authors = row.original.book.authors;

      return (
        <div className="max-h-[100px] rounded-lg text-left">
          <div className="font-semibold">{title}</div>
          <div className="text-zinc-400">
            {authors?.length > 1 ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div>{authors[0]?.fullName} and the others</div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-black rounded-lg p-5"
                  >
                    {authors.slice(1).map((author) => (
                      <div key={author._id} className="text-white">
                        {author.fullName}
                      </div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div>{authors[0]?.fullName}</div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row, table }) => {
      console.log(row);
      return (
        <Select
          defaultValue="buy"
          value={row.original.method}
          onValueChange={(value) => {
            table.options.meta?.updateData(row.index, "method", value);
          }}
        >
          <SelectTrigger className="border-2 border-b-black bg-white/60">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="borrow">Borrow</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.costForMethod as number;

      return (
        <div className="max-h-[100px] rounded-lg text-left">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row, table }) => {
      return (
        <Input
          value={row.original.book.quantity}
          type="number"
          min="1"
          max={row.original.book.numberOfCopies}
          className="min-w-50px w-[30%]"
          onChange={(e) => {
            const el = e.target as HTMLInputElement;

            if (parseInt(el.value) < 1) {
              el.value = el.min;
            }
            if (isNaN(parseInt(el.value))) {
              el.value = el.min;
            }
            table.options.meta?.updateData(
              row.index,
              "quantity",
              parseInt(e.target.value)
            );
          }}
        />
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row, table }) => {
      console.log(row.original);
      return (
        <div className="max-h-[100px] rounded-lg text-left">
          {(
            row.original.costForMethod * row.original.book.quantity
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    enableHiding: true,
    cell: ({ row, table }) => {
      return (
        <div className="flex items-center">
          <Button
            variant="destructive"
            className="ml-3 w-[20px] h-[30px]"
            onClick={() => table.options.meta?.removeBook(row.index)}
          >
            <Trash color={"white"} />
          </Button>
        </div>
      );
    },
  },
];
