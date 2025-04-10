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
import { ArrowUpDown, ChevronDown, Edit, Loader2, MoreHorizontal, RefreshCcw, Trash } from "lucide-react"

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
import { toast } from "sonner"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


export type Stock = {
  _id: string
  name: string
  partnumber: number
  location:string
  measurement:string
  quantity:number
  category:string
  max_stock:number
  min_stock:number
  price:number
}

const handleDelete = async(id:any)=> {
  try{
    const response = await fetch(`/api/stock/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to deleting stock")
    }
    toast.success(
          "Success! Stock deleted.",
        )
  }catch(error){
    toast.error(
      `Failed to delete stock, Error: ${error}`
   )
  }
}
export const columns: ColumnDef<Stock>[] = [
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
    cell: ({ row }) => {
      return <TableCellViewer item={row.original}/>
    }
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
    accessorKey: "location",
    header: () => <div className="">Location</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("location")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "measurement",
    header: () => <div className="">Measurement</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("measurement")}
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
    accessorKey: "max_stock",
    header: () => <div className="">Max. in stock</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("max_stock")}
        </Badge>
        </div>
    },
  },
  {
    accessorKey: "min_stock",
    header: () => <div className="">Min. in stock</div>,
    cell: ({ row }) => {
      return <div>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.getValue("min_stock")}
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
     return(
      <DeleteButton item={row.original}/>
     )
    },
  },
]


const Getallinventory = () => {
        const [stock, setStock] = React.useState<Stock[]>([])
        const [loading, setLoading] = React.useState(true)

        const fetchStock = async () => {
          setLoading(true)
          const response = await fetch("/api/stock")
          const data = await response.json()
          setStock(data.stocks)
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
        data:stock,
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
        React.useEffect(() => {
                    fetchStock()
                  }, [])
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
           <div className="w-full flex justify-end mr-5">
        <Button disabled={loading} onClick={fetchStock}>
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
function TableCellViewer({ item }: {item:any }) {
  const isMobile = useIsMobile()
  const [newname, setNewname] = React.useState("")
  const [newcategory, setNewcategory] = React.useState("")
  const [newlocation, setNewlocation] = React.useState("")
  const [newmeasurement, setNewmeasurement] = React.useState("")
  const [newpartnumber, setNewpartnumber] = React.useState("")
  const [newmax_stock, setNewmax_stock] = React.useState("")
  const [newmin_stock, setNewmin_stock] = React.useState("")
  const [newquantity, setNewquantity] = React.useState(0)
  const [newprice, setNewprice] = React.useState("")
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [fetchedLocations, setFetchedLocations] = React.useState([])
  const [fetchedCategory, setFetchedCategory] = React.useState([])
  const [fetchedMeasurement, setFetchedMeasurement] = React.useState([])
  const [fetching, setFetching] = React.useState(false)
    async function onUpdate(){
      setIsUpdating(true)
      let name = newname ||  item.name
      let category = newcategory ||  item.category
      let location = newlocation ||  item.location
      let measurement = newmeasurement ||  item.measurement
      let partnumber = newpartnumber ||  item.partnumber
      let max_stock = newmax_stock ||  item.max_stock
      let min_stock = newmin_stock ||  item.min_stock
      let quantity = newquantity ||  item.quantity
      let price = newprice ||  item.price
      try{
        const response = await fetch (`/api/stock/update/${item._id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({name,category,location,measurement,partnumber,max_stock,min_stock,quantity,price})
        })
        if (!response.ok) {
          const error = await response.json()
          toast.error(`Failed to update stock: ${error}`)
          throw new Error(error.message || "Failed to create post")
        }
        toast.success(
          "Success! stock has been updated",
       )
      } catch (error) {
        toast.error(
           `Failed to update stock, Error ${error}`,
        )
      } finally {
        setIsUpdating(false)
      }
    }
    const fetchParams = async () => {
      setFetching(true)

      const response = await fetch("/api/locations")
      const data = await response.json()
      setFetchedLocations(data.locations)

      const response1 = await fetch("/api/category")
      const data1 = await response1.json()
      setFetchedCategory(data1.category)

      const response2 = await fetch("/api/measurement")
      const data2 = await response2.json()
      setFetchedMeasurement(data2.measurement)

      setFetching(false)
    }
    React.useEffect(() => {
          fetchParams()
      }, [])
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit cursor-pointer">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit Stock</DrawerTitle>
          <DrawerDescription>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Name</Label>
              <Input id="header" defaultValue={item.name} onChange={(e)=>setNewname(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Part Number</Label>
              <Input id="header" defaultValue={item.partnumber} onChange={(e)=>setNewpartnumber(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Category</Label>
              {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setNewcategory} value={newcategory} defaultValue={item.category}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                  {
                    fetchedCategory.map((item: any, index: number) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
            )
          }
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Location</Label>
              {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setNewlocation} value={newlocation} defaultValue={item.location}>
                  <SelectTrigger id="location" className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                  {
                    fetchedLocations.map((item: any, index: number) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
            )
          }
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Measurement</Label>
              {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setNewmeasurement} value={newmeasurement} defaultValue={item.measurement}>
                  <SelectTrigger id="measurement" className="w-full">
                    <SelectValue placeholder="Select Measurement" />
                  </SelectTrigger>
                  <SelectContent>
                  {
                    fetchedMeasurement.map((item: any, index: number) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
            )
          }
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Quantity</Label>
              <Input id="header" defaultValue={item.quantity} onChange={(e)=>setNewquantity(+e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Max. in Stock</Label>
              <Input id="header" defaultValue={item.max_stock} onChange={(e)=>setNewmax_stock(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Min. in Stock</Label>
              <Input id="header" defaultValue={item.min_stock} onChange={(e)=>setNewmin_stock(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Price</Label>
              <Input id="header" defaultValue={item.price} onChange={(e)=>setNewprice(e.target.value)}/>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button className="cursor-pointer" disabled={isUpdating} onClick={onUpdate} >
           {isUpdating ? (
               <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
              </>
                ) : (
                    "Update"
            )} 
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
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
export default Getallinventory