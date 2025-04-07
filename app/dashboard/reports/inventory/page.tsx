"use client";
import  React,{useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { format, isAfter, isBefore } from "date-fns";
import { CalendarIcon, Loader2, Search,} from "lucide-react";

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
              throw new Error(error.message || "Failed to search the item")
            }
          const data = await response.json()
          setFilteredData(data.searchedStock)
      }catch(error){
          toast(`Failed to search. ${error}`)
      }finally{
          setIsSubmitting(false)
      }
  }
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
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((item:any) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                </TableRow>
              ))
            ) : (
              
              <div className="text-center w-full p-5">
                  No results found.
                </div>
            )}
            </TableBody>
          </Table>
      </div>
    </div>
  );
};

export default InventoryReportPage;
