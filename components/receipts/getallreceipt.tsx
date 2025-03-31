"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Receipt[] = [
    {
        id:'1',
        clientname:"John Doe",
        clientcontact:"02000333656",
        invoicenumber:"ASD24930",
        valuedate:"March 2 2025",
        itemname:'Wireless Mouse',
        price:200,
        quantity:2,
        totalprice:400
    },
]

export type Receipt = {
  id: string
  clientname:string
  clientcontact:string
  invoicenumber:string
  valuedate:string
  itemname: string
  quantity:number
  price:number
  totalprice:number
}

export const columns: ColumnDef<Receipt>[] = [
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
    accessorKey: "clientname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="captilize ml-3">{row.getValue("clientname")}</div>,
  },
  {
    accessorKey: "clientcontact",
    header: () => <div className="">Client Contact</div>,
    cell: ({ row }) => {

      return <div className="font-medium">{row.getValue("clientcontact")}</div>
    },
  },
  {
    accessorKey: "valuedate",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Value Date
            <ArrowUpDown />
          </Button>
        )
      },
    cell: ({ row }) => {
      return <div>{row.getValue("valuedate")}</div>
    },
  },
  {
    accessorKey: "itemname",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item Name
            <ArrowUpDown />
          </Button>
        )
      },
    cell: ({ row }) => {
      return <div>{row.getValue("itemname")}</div>
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {

      return <div>{row.getValue("price")}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="">Quantity</div>,
    cell: ({ row }) => {

      return <div>{row.getValue("quantity")}</div>
    },
  },
  {
    accessorKey: "totalprice",
    header: () => <div className="">Total Price</div>,
    cell: ({ row }) => {

      return <div>{row.getValue("totalprice")}</div>
    },
  },
  {
    id: "actions",
    header:"Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-red-500"><Trash className="text-red-500" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
const Getallreceipt = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
          const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
                []
              )
              const [columnVisibility, setColumnVisibility] =
                React.useState<VisibilityState>({})
              const [rowSelection, setRowSelection] = React.useState({})
            
              const table = useReactTable({
                data,
                columns,
                onSortingChange: setSorting,
                onColumnFiltersChange: setColumnFilters,
                getCoreRowModel: getCoreRowModel(),
                getPaginationRowModel: getPaginationRowModel(),
                getSortedRowModel: getSortedRowModel(),
                getFilteredRowModel: getFilteredRowModel(),
                onColumnVisibilityChange: setColumnVisibility,
                onRowSelectionChange: setRowSelection,
                state: {
                  sorting,
                  columnFilters,
                  columnVisibility,
                  rowSelection,
                },
              })
  return (
    <div className="w-full">
                <div className="flex items-center py-4">
                  <Input
                    placeholder="Filter Receipts..."
                    value={(table.getColumn("clientname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn("clientname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          )
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
                            )
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
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                </div>
              </div>
  )
}

export default Getallreceipt