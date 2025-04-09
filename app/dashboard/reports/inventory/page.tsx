"use client";
import  React,{useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { format, isAfter, isBefore } from "date-fns";
import { CalendarIcon, File, Loader2, Search,} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "@/components/ui/separator";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../components/ui/select";
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



const InventoryReportPage = () => {
    const [name, setName] = useState("");
    // const [startDate, setStartDate] = useState<Date>();
    const [category, setCategory] = useState("");
    const [partnumber, setPartnumber] = useState("");
    const [location, setLocation] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [filteredData, setFilteredData] = useState<any>([]);

    const [fetchedLocations, setFetchedLocations] = useState([])
    const [fetchedCategory, setFetchedCategory] = useState([])
    const [fetching, setFetching] = useState(false)

    let downloaddata: any;
    const fetchParams = async () => {
      setFetching(true)

      const response = await fetch("/api/locations")
      const data = await response.json()
      setFetchedLocations(data.locations)

      const response1 = await fetch("/api/category")
      const data1 = await response1.json()
      setFetchedCategory(data1.category)

      setFetching(false)
    }
    async function onSubmit(){
      setIsSubmitting(true)
      const params = new URLSearchParams();
      if (name) params.append("name", name);
  if (category) params.append("category",category);
  if (partnumber) params.append("partnumber", partnumber);
  if (location) params.append("location", location);
  if (quantity) params.append("quantity",quantity.toString());

  const queryString = params.toString();
      try{
          const response = await fetch(`/api/stock/search?${queryString}`)
          if (!response.ok) {
              const error = await response.json()
              toast.error(`Failed to search, ${error}`)
              throw new Error(error.message || "Failed to search the item")
            }
          const data = await response.json()
          toast.success("Done with the search")
          setFilteredData(data.searchedStock)
      }catch(error){
          toast.error(`Failed to search. ${error}`)
      }finally{
          setIsSubmitting(false)
      }
   }
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid date"; // optional guard
    return date.toUTCString(); // or use toLocaleString() for local format
  };
  downloaddata = filteredData
  const prefix = Math.random().toString();
  const newT = prefix.slice(14,18)
  const downloadCSV = (data: any[], filename = `stock-data${newT}.csv`) => {
    const headers = [
      "Date",
      "Name",
      "Category",
      "Location",
      "Measurement",
      "Part Number",
      "Mx. Stock",
      "Mn. Stock",
      "Quantity",
      "Price",
    ];
  
    const rows = data.map(item => [
      new Date(item.updatedAt).toLocaleDateString(), // format date if needed
      item.name,
      item.category,
      item.location,
      item.measurement,
      item.partnumber,
      item.max_stock,
      item.min_stock,
      item.quantity,
      item.price,
    ]);
  
    const csvContent =
      [headers, ...rows]
        .map(row => row.map(value => `"${value}"`).join(","))
        .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  
    useEffect(() => {
      fetchParams()
      }, []);
  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-bold">Inventory Report</h2>
      <div className="w-full flex justify-between py-5">
        <div className="flex gap-4">
        <Input placeholder="Stock Name" className="w-fit" 
            onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Part Number" className="w-fit" 
            onChange={(e) => setPartnumber(e.target.value)} />
        <Input placeholder="Quantity" type="number" className="w-fit" 
            onChange={(e) => setQuantity(+e.target.value)} />
        {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location" className="">
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
           {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger id="category" className="">
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
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {startDate ? format(startDate, "PPP") : "Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
        </div>
        <Button variant="default" disabled={isSubmitting} onClick={onSubmit} className="cursor-pointer">
          {
            isSubmitting ? (
              <>
                <Loader2  className='h-4 w-4 animate-spin'/> Searching...
              </>
              ):(
              <>
                <Search/> Search
              </>
               )
         }
          </Button>
      </div>
        <Separator />
        <div className="overflow-hidden rounded-lg border">
          <div className="flex w-full p-2 justify-between items-center">
            <div>
              <h2 className="font-bold text-lg">Searched Results</h2>
            </div>
            <Button className="flex gap-2 cursor-pointer" onClick={()=>downloadCSV(downloaddata)}><File /> Download CSV</Button>
          </div>
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Measurement</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead>Mx. Stock</TableHead>
              <TableHead>Mn. Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((item:any) => (
                <TableRow key={item._id}>
                  <TableCell>{formatDate(item.updatedAt)}</TableCell>
                  <TableCell>
                    <DetailsViewer item={item}/>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.measurement}</TableCell>
                  <TableCell>{item.partnumber}</TableCell>
                  <TableCell>{item.max_stock}</TableCell>
                  <TableCell>{item.min_stock}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))
            ) : (
              
              <TableRow className="text-center p-5">
                  <TableCell>No results found.</TableCell>
                </TableRow>
            )}
            </TableBody>
          </Table>
      </div>
    </div>
  );
};
function DetailsViewer({item}:{item:any}){
  const [searchedIssuename,setSearchedIssueName] = useState<any>([])
  const [searchedReceiptname,setSearchedReceiptName] = useState<any>([])
  const [detailsSearch, setDetailsSearch] = useState(true)
  const fetchNewParams = async () => {
    setDetailsSearch(true)

    const response = await fetch(`/api/issues/search/name?query=${item.name}`)
    const data = await response.json()
    setSearchedIssueName(data.searchedIssue)
    
    setDetailsSearch(false)
  }
  const fetchReceipt = async(itemname:string)=>{
    const response1 = await fetch(`/api/receipt/search/name?query1=${itemname}`)
    const data1 = await response1.json()
    setSearchedReceiptName(data1.searchedReceipt)
  }
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid date"; // optional guard
    return date.toUTCString(); // or use toLocaleString() for local format
  };
  useEffect(()=>{
    fetchNewParams()
    fetchReceipt(`${item.name}`)
  },[])
return(
  <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">{item.name}</p>
      </DialogTrigger>
      <DialogContent className="max-w-[1050px]! max-h-fit">
        <DialogHeader>
          <DialogTitle>Details of {item.name}</DialogTitle>
          <DialogDescription>
            Click download PDF to save locally.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full p-4 border rounded-lg">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Last Updated</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Measurement</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead>Mx. Stock</TableHead>
              <TableHead>Mn. Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                <TableRow key={item._id}>
                  <TableCell>{formatDate(item.updatedAt)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.measurement}</TableCell>
                  <TableCell>{item.partnumber}</TableCell>
                  <TableCell>{item.max_stock}</TableCell>
                  <TableCell>{item.min_stock}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
        {
          detailsSearch ? (
            <Loader2 className="w-full h-4 animate-spin"/>
          ):(
        <div className="w-full p-4 border rounded-lg">
          <p className="font-semibold py-2">Transactions Made</p>
          <div className="w-full py-2">
            <p className="py-1">Issues Made</p>
            <div>
            <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Reference Number</TableHead>
            <TableHead>Value Date</TableHead>
            <TableHead>Trans Code</TableHead>
            <TableHead>Trans Type</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedIssuename.length ? (
            searchedIssuename.map((item:any) => (
              <TableRow key={item._id}>
                <TableCell>{item.referencenumber}</TableCell>
                <TableCell>{item.valuedate}</TableCell>
                <TableCell>{item.transcode}</TableCell>
                <TableCell>{item.transtype}</TableCell>
                <TableCell>{item.customer}</TableCell>
                <TableCell>{item.remarks}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center p-5">
                <TableCell>No issue found.</TableCell>
              </TableRow>
          )}
          </TableBody>
        </Table>
            </div>
          </div>
          <div className="w-full py-2">
            <p className="py-1">Receipts Made</p>
            <div>
            <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Reference Number</TableHead>
            <TableHead>Value Date</TableHead>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Invoice Date</TableHead>
            <TableHead>Trans Code</TableHead>
            <TableHead>Trans Type</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedReceiptname.length ? (
            searchedReceiptname.map((item:any) => (
              <TableRow key={item._id}>
                <TableCell>{item.referencenumber}</TableCell>
                <TableCell>{item.valuedate}</TableCell>
                <TableCell>{item.invoicenumber}</TableCell>
                <TableCell>{item.invoicedate}</TableCell>
                <TableCell>{item.transcode}</TableCell>
                <TableCell>{item.transtype}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.remarks}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center p-5">
                <TableCell>No issue found.</TableCell>
              </TableRow>
          )}
          </TableBody>
        </Table>
            </div>
          </div>
        </div>
          )
        }
        <DialogFooter>
          <Button type="submit" className="cursor-pointer hide-on-print" onClick={() => window.print()}><File/> Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
)
}
export default InventoryReportPage;
