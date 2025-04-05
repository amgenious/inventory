"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState,useEffect } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const Addissues = () => {
    const [referencenumber, setReferenceNumber] = useState("")
    const [valuedate, setValueDate] = useState("")
    const [transtype, setTranstype] = useState("")
    const [transcode, setTransCode] = useState("")
    const [customer, setCustomer] = useState("")
    const [remarks, setRemarks] = useState("")
    const [itemname, setItemname] = useState("")
    const [partnumber, setPartNumber] = useState("")
    const [location, setLocation] = useState("")
    const [quantity, setQuantity] = useState(0)
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default"><Plus /> Add Issue</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add Issue</DialogTitle>
        <DialogDescription>
          Add New Issues here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Value Date
          </Label>
          <Input id="date" placeholder="date" onChange={(e) => setValueDate(e.target.value)} value={Date.now()} className="col-span-3" disabled />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="transtype" className="text-right">
              Trans Type
          </Label>
          <Input id="transtype" placeholder="Trans Type" onChange={(e) => setTranstype(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="transcode" className="text-right">
              Trans Code
          </Label>
          <Input id="transcode" placeholder="Trans Code" onChange={(e) => setTransCode(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="customer" className="text-right">
              Customer
          </Label>
          <Input id="customer" placeholder="Customer" onChange={(e) => setCustomer(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="remarks" className="text-right">
              Remarks
          </Label>
          <Input id="remarks" type="text" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex gap-4 flex-1/3">
          <Label htmlFor="item" className="text-right">
              Item Name
          </Label>
          <Input id="item"  placeholder="Item Name"  onChange={(e) => setItemname(e.target.value)} className="col-span-3" />
        </div>
            <div className="flex gap-4 flex-1/3">
          <Label htmlFor="partnumber" className="text-right">
              Partnumber
          </Label>
          <Input id="partnumber" placeholder="Price" type="text" onChange={(e) => setPartNumber(e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4 flex-1/3">
          <Label htmlFor="location" className="text-right">
              Location
          </Label>
          <Input id="location" placeholder="Location" type="text" onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
            </div>
        </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
          <Label htmlFor="quantities" className="text-right">
              Quantities
          </Label>
          <Input id="quantities" placeholder="Quantities" type="number" onChange={(e) => setQuantity(+e.target.value)} className="col-span-3" />
            </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Addissues