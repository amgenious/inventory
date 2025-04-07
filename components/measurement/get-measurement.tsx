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
import { ArrowUpDown, ChevronDown, Loader2, MoreHorizontal, RefreshCcw, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useIsMobile } from "@/hooks/use-mobile"
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from "../ui/drawer"
import { Label } from "../ui/label"
import { toast } from "sonner"

export type Measurement = {
  _id: string
  name: string
}

const handleDelete = async(id:any)=> {
  try{
    const response = await fetch(`/api/measurement/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to deleting category")
    }
    toast(
          "Success! Category deleted.",
        )
  }catch(error){
    toast(
      `Failed to delete category, Error: ${error}`
   )
  }
}
export const columns: ColumnDef<Measurement>[] = [
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
          Measurement Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
        return <TableCellViewer item={row.original}/>
    }
  },
  {
    id: "actions",
    header:"Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DeleteButton item={row.original}/>
        )
    },
  },
]

const Getmeasurement = () => {
     const [measurement, setMeasurement] = React.useState<Measurement[]>([])
      const [loading, setLoading] = React.useState(true)

      const fetchMeasurement = async () => {
        setLoading(true)
        const response = await fetch("/api/measurement")
        const data = await response.json()
        setMeasurement(data.measurement)
        setLoading(false)
      }

    const [sorting, setSorting] = React.useState<SortingState>([])
          const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
            []
          )
          const [columnVisibility, setColumnVisibility] =
            React.useState<VisibilityState>({})
          const [rowSelection, setRowSelection] = React.useState({})
        
          const table = useReactTable({
            data:measurement,
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
          React.useEffect(()=>{
            fetchMeasurement()
          },[])
  return (
    <div className="w-full">
           <div className="flex items-center py-4">
             <Input
               placeholder="Filter Measurements..."
               value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
               onChange={(event) =>
                 table.getColumn("name")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
             />
             <div className="w-full flex justify-end mr-5">
        <Button disabled={loading} onClick={fetchMeasurement}>
          {
            loading ? (
              <RefreshCcw className="animate-spin"/>
            ):(
              <p className="flex justify-center gap-2 items-center"> <RefreshCcw /> Refresh</p>
            )
          }
        </Button>
        </div>
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
            {
              loading ? (
                <Loader2  className="h-4 animate-spin w-full text-center"/>
              ):(
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
              )
            }
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
function TableCellViewer({ item }: {item:any }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit cursor-pointer">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit Measurement</DrawerTitle>
          <DrawerDescription>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Measurement</Label>
              <Input id="header" defaultValue={item.name} />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
function DeleteButton ({item}: {item:any}) {
  return(
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-red-500" onClick={()=>handleDelete(item._id)}><Trash className="text-red-500" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
  )
}
export default Getmeasurement