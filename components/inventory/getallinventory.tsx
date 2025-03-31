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
import { Badge } from "../ui/badge"

const data: Inventory[] = [
    {
        id:'1',
        name:'Wireless Mouse',
        partnumber:11265,
        productlabel:"P001",
        quantity:20,
        category:"electronics",
        maxinstock:25,
        mininstock:5,
        price:200
    },
]

export type Inventory = {
  id: string
  name: string
  partnumber: number
  productlabel:string
  quantity:number
  category:string
  maxinstock:number
  mininstock:number
  price:number
}

export const columns: ColumnDef<Inventory>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inventory Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="captilize ml-3 font-medium">
      {row.getValue("name")}</div>,
  },
  {
    accessorKey: "partnumber",
    header: () => <div className="">Part Number</div>,
    cell: ({ row }) => {

      return <div className="font-medium">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("partnumber")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "productlabel",
    header: () => <div className="">Product Label</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("productlabel")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="">Quantity</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("quantity")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="">Category</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("category")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "maxinstock",
    header: () => <div className="">Max. in stock</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("maxinstock")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "mininstock",
    header: () => <div className="">Min. in stock</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("mininstock")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("price")}
        </Badge>
        </div>
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
            <DropdownMenuItem>
              <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500"><Trash className="text-red-500" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


const Getallinventory = () => {
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
             placeholder="Filter Inventory..."
             value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
             onChange={(event) =>
               table.getColumn("name")?.setFilterValue(event.target.value)
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

export default Getallinventory