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
import { useState } from "react"


const Addreceipt = () => {
    const [clientName, setClientName] = useState("")
    const [clientContact, setContact] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [valuedate, setValueDate] = useState("")
    const [itemName, setItemname] = useState("")
    const [quantities, setQuantities] = useState("")
    const [price, setPrice] = useState("")
    const [totalprice, setTotalPrice] = useState("")
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default"><Plus /> Add Receipt</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add Receipt</DialogTitle>
        <DialogDescription>
          Add New Receipt here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Client Name
          </Label>
          <Input id="name" placeholder="Client Name" onChange={(e) => setClientName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="clientcontact" className="text-right">
              Client Contact
          </Label>
          <Input id="clientcontact" placeholder="Client Contact" onChange={(e) => setContact(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invoicenumber" className="text-right">
              Invoice Number
          </Label>
          <Input id="invoicenumber" placeholder="Invoice Number" onChange={(e) => setInvoiceNumber(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="valuedate" className="text-right">
              Value Date
          </Label>
          <Input id="valuedate" type="date" placeholder="Valuedate" onChange={(e) => setValueDate(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex gap-4 flex-1/3">
          <Label htmlFor="item" className="text-right">
              Item Name
          </Label>
          <Input id="item"  placeholder="Item Name"  onChange={(e) => setItemname(e.target.value)} className="col-span-3" />
        </div>
            <div className="flex gap-4 flex-1/3">
          <Label htmlFor="quantities" className="text-right">
              Quantities
          </Label>
          <Input id="quantities" placeholder="Quantities" onChange={(e) => setQuantities(e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4 flex-1/3">
          <Label htmlFor="price" className="text-right">
              Price
          </Label>
          <Input id="price" placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} className="col-span-3" />
            </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="Totalprice" className="text-right">
             Total Price
          </Label>
          <Input id="Totalprice" placeholder="Total Price" type="number" onChange={(e) => setTotalPrice(e.target.value)} className="col-span-3" />           
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Addreceipt