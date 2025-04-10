"use client"
import  React,{useState, useEffect} from "react";
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { CalendarIcon, File, Loader2, Search } from 'lucide-react'
import { Separator } from "@/components/ui/separator";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../../components/ui/select";
import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton";
import { IconPdf } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const IssuesReportPage = () => {
    const [referencenumber, setReferencenumber] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [customer, setCustomer] = useState("");
    const [partnumber, setPartnumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [filteredData, setFilteredData] = useState<any>([]);

    const [fetchedSupplier, setFetchedSupplier] = useState([])
    const [fetching, setFetching] = useState(false)
    let downloaddata: any;

    const fetchParams = async () => {
      setFetching(true)

      const response = await fetch("/api/customer")
      const data = await response.json()
      setFetchedSupplier(data.customers)

      setFetching(false)
    }
    const formatDate = (timestamp: string): string => {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toUTCString(); 
    };
    async function onSubmit(){
      setIsSubmitting(true)
          const params = new URLSearchParams();
          if (referencenumber) params.append("referencenumber", referencenumber);
          if (partnumber) params.append("partnumber", partnumber);
          if (customer) params.append("customer", customer);
          if (startDate) params.append("startDate",startDate.toISOString().split("T")[0]);
          if (endDate) params.append("endDate",endDate.toISOString().split("T")[0]);
          
          const queryString = params.toString();
          try{
              const response = await fetch(`/api/issues/search/report?${queryString}`)
              if (!response.ok) {
                  const error = await response.json()
                  toast.error(`Failed to search, ${error}`)
                  throw new Error(error.message || "Failed to search the item")
                  }
                  const data = await response.json()
                  toast.success("Done with the search")
                  setFilteredData(data.searchedIssue)
              }catch(error){
                toast.error(`Failed to search. ${error}`)
              }finally{
                setIsSubmitting(false)
              }
    }
    downloaddata = filteredData
    const prefix = Math.random().toString();
    const newT = prefix.slice(14,18)
    const downloadCSV = (data: any[], filename = `issues-report-${newT}.csv`) => {
      const headers = [
        "Date",
        "Reference Number",
        "Value Date",
        "Trans Type",
        "Trans Code",
        "Customer",
        "Item",
        "Part Number",
        "Location",
        "Quantity",
      ];
    
      const rows = data.map(item => [
        new Date(item.createdAt).toLocaleDateString(), // format date if needed
        item.referencenumber,
        item.valuedate,
        item.transtype,
        item.transcode,
        item.customer,
        item.itemname,
        item.partnumber,
        item.location,
        item.quantity,
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
    useEffect(()=>{
      fetchParams()
    },[])     
  return (
    <div className='px-4 lg:px-6'>
      <h2 className='text-xl font-bold'>Issue Report</h2>
      <div className="w-full flex justify-between py-5 hide-on-print">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
        <Input placeholder="Reference Number" className="w-fit" 
            onChange={(e) => setReferencenumber(e.target.value)} />
        <Input placeholder="Part Number" className="w-fit" 
            onChange={(e) => setPartnumber(e.target.value)} />
        {
          fetching ? (
            <Skeleton className="h-10 w-36 bg-gray-200!"/>
          ):(
            <Select onValueChange={setCustomer} value={customer}>
                  <SelectTrigger id="customer" className="">
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent>
                  {
                    fetchedSupplier.map((item: any, index: number) => (
                      <SelectItem value={item.name} key={index}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
            )
          }  
        </div>
        <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {startDate ? format(startDate, "PPP") : " Start Date"}
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
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {endDate ? format(endDate, "PPP") : " End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        </div>
        </div>
        <Button variant="default" disabled={isSubmitting} onClick={onSubmit}  className="cursor-pointer hide-on-print">
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
                  <div className="flex gap-5">
                  <Button type="submit"  className="cursor-pointer hide-on-print" onClick={() => window.print()}><IconPdf/> Download PDF</Button>
                  <Button className="flex gap-2 cursor-pointer hide-on-print"  onClick={()=>downloadCSV(downloaddata)}><File /> Download CSV</Button>
                   </div>
                </div>
              <Table>
                <TableHeader className="bg-muted sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference Number</TableHead>
                    <TableHead>Value Date</TableHead>
                    <TableHead>Trans Type</TableHead>
                    <TableHead>Trans Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Part No.</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length ? (
                    filteredData.map((item:any) => (
                      <TableRow key={item._id}>
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                        <TableCell>{item.referencenumber}</TableCell>
                        <TableCell>{item.valuedate}</TableCell>
                        <TableCell>{item.transtype}</TableCell>
                        <TableCell>{item.transcode}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.itemname}</TableCell>
                        <TableCell>{item.partnumber}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
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
  )
}

export default IssuesReportPage