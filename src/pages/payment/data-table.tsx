import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import {
  BookCartItem,
  removeBook,
  updateBookFromTable,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../../api";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { get } from "http";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const data = cart.items;
  const [isBuy, setIsBuy] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        dispatch(updateBookFromTable({ index: rowIndex, columnId, value }));
      },
      removeBook: (rowIndex: number) => {
        const item: BookCartItem = data[rowIndex];
        dispatch(removeBook(item.book));
      },
      getIsBuy: () => isBuy,
    },
  });

  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <div className="bg-zinc-100 min-h-[300px] rounded-xl">
        <div className="flex items-center p-10 justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5 justify-between">
              <Label htmlFor="ship-option">Shipping Options</Label>
              <Select>
                <SelectTrigger className="border-2 border-b-black bg-white/60 p-2 rounded-lg">
                  <SelectValue placeholder="Not implemented" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hello">HELLO</SelectItem>
                  <SelectItem value="hello">HELLO</SelectItem>
                  <SelectItem value="hello">HELLO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-5 justify-between">
              <Label htmlFor="ship-option">Coupon code</Label>
              <Select>
                <SelectTrigger className="border-2 border-b-black bg-white/60 p-2 rounded-lg">
                  <SelectValue placeholder="Not implemented" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hello">HELLO</SelectItem>
                  <SelectItem value="hello">HELLO</SelectItem>
                  <SelectItem value="hello">HELLO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <table>
            <tbody>
              <tr>
                <td className="p-3">Subtotal</td>
                <td className="p-3">
                  {table.getSelectedRowModel().rows.length > 0
                    ? table
                        .getSelectedRowModel()
                        .rows.reduce(
                          (acc, row) =>
                            acc +
                            (row.original as BookCartItem).costForMethod *
                              (row.original as BookCartItem).book?.quantity,
                          0
                        )
                        .toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                    : "0 VND"}
                </td>
              </tr>
              <tr>
                <td className="p-3">Shipping</td>
                <td className="p-3">
                  {(100000 as Number).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
              <tr>
                <td className="p-3">Coupon</td>
                <td className="p-3">0.0</td>
              </tr>
              <tr>
                <td className="p-3">Discount</td>
                <td className="p-3">0.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center p-10 box-content text-white justify-end">
          <Button
            variant="outline"
            size="lg"
            className="bg-pink-400 rounded-full text-white flex items-center gap-5 group"
            disabled={table.getSelectedRowModel().rows.length <= 0}
            onClick={async () => {
              const items = table
                .getSelectedRowModel()
                .rows.map((item) => item.original as BookCartItem);
              if (token == null) {
                navigate("/auth/login");
                return;
              }

              if (user == null) {
                navigate("/auth/login");
                return;
              }

              const res = await checkout(items, token, user.id);
              if (res != null) {
                const { url } = res;

                window.location.href = url;
              }
            }}
          >
            Checkout
            <p className=" font-semibold group-hover:text-pink-400">
              {table.getSelectedRowModel().rows.length > 0
                ? (
                    table
                      .getSelectedRowModel()
                      .rows.reduce(
                        (acc, row) =>
                          acc +
                          (row.original as BookCartItem).costForMethod *
                            (row.original as BookCartItem).book?.quantity,
                        0
                      ) + 100000
                  ).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                : "0 VND"}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
