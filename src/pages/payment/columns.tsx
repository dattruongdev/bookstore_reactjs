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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Book>[] = [
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
      const image = row.original.imageUrl as string;

      return <img className="max-h-[100px] rounded-lg" src={image} />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title as string;
      const authors = row.original.authors;

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
                      <div key={author.id} className="text-white">
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
      return (
        <Select
          defaultValue="buy"
          onValueChange={(value) => {
            table.options.meta?.updateData(row.index, "method", value);
          }}
        >
          <SelectTrigger className="border-2 border-b-black bg-white/60">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buy" onClick={() => {}}>
              Buy
            </SelectItem>
            <SelectItem value="borrow" onClick={() => {}}>
              Borrow
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.bookPricing?.cost.amount as number;

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
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const price = (row.original.bookPricing?.cost.amount *
        row.original.quantity) as number;

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
];
