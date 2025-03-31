"use client";
import  React,{useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { format, isAfter, isBefore } from "date-fns";
import { CalendarIcon, Search,} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const dummyData = [
    { id: 1, name: "Wireless Mouse", category: "Electronics", date: "2025-03-20" },
  ];

const InventoryReportPage = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [category, setCategory] = useState("");
    const [filteredData, setFilteredData] = useState(dummyData);

    useEffect(() => {
        let filtered = dummyData;
    
        // Filter by search
        if (search) {
          filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        }
    
        // Filter by start and end dates
        if (startDate) {
          filtered = filtered.filter((item) => isAfter(new Date(item.date), new Date(startDate)) || format(new Date(item.date), "yyyy-MM-dd") === format(new Date(startDate), "yyyy-MM-dd"));
        }
    
        if (startDate && endDate) {
          filtered = filtered.filter(
            (item) =>
              (isAfter(new Date(item.date), new Date(startDate)) || format(new Date(item.date), "yyyy-MM-dd") === format(new Date(startDate), "yyyy-MM-dd")) &&
              (isBefore(new Date(item.date), new Date(endDate)) || format(new Date(item.date), "yyyy-MM-dd") === format(new Date(endDate), "yyyy-MM-dd"))
          );
        }
    
        // Filter by category
        if (category) {
          filtered = filtered.filter((item) => item.category === category);
        }
    
        setFilteredData(filtered);
      }, [search, startDate, endDate, category]);
  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-bold">Inventory Report</h2>
      <div className="w-full flex justify-between py-5">
        <div className="flex gap-4">
        <Input placeholder="...🔍 Search Inventory" className="w-fit"  value={search}
            onChange={(e) => setSearch(e.target.value)} />
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
              {startDate ? format(startDate, "PPP") : "Start date"}
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
              {endDate ? format(endDate, "PPP") : <span>End date</span>}
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
        <DropdownMenu>
            <DropdownMenuTrigger className="border-2 px-3 rounded-md text-muted-foreground">
              {category || "Category"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Array.from(new Set(dummyData.map((item) => item.category))).map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => setCategory("")}>All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="default"><Search /> Search</Button>
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
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryReportPage;
