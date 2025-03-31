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


const Addinventory = () => {
    const [inventoryName, setInventoryName] = useState("")
    const [partnumber, setPartnumber] = useState("")
    const [productlabel, setProductLabel] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [maxinstock, setMaxinstock] = useState("")
    const [mininstock, setMininstock] = useState("")
    const [price, setPrice] = useState("")
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default"><Plus /> Add Inventory</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add Inventory</DialogTitle>
        <DialogDescription>
          Add New Inventory here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Inventory Name
          </Label>
          <Input id="name" placeholder="Inventory Name" onChange={(e) => setInventoryName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="partnumber" className="text-right">
              Part Number
          </Label>
          <Input id="partnumber" placeholder="Part Number" onChange={(e) => setPartnumber(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="productlabel" className="text-right">
              Product Label
          </Label>
          <Input id="productlabel" placeholder="Product Label" onChange={(e) => setProductLabel(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex gap-4">
          <Label htmlFor="quantity" className="text-right">
              Quantity
          </Label>
          <Input id="quantity" placeholder="Quantity" type="number" onChange={(e) => setQuantity(e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4">
          <Label htmlFor="category" className="text-right">
              Category
          </Label>
          <Input id="categroy" placeholder="Category" onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
            </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex gap-4">
          <Label htmlFor="maxinstock" className="text-right">
              Max. in Stock
          </Label>
          <Input id="maxinstock" placeholder="Max in stock" type="number" onChange={(e) => setMaxinstock(e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4">
          <Label htmlFor="mininstock" className="text-right">
              Min. in stock
          </Label>
          <Input id="mininstock" placeholder="Min in stock" type="number" onChange={(e) => setMininstock(e.target.value)} className="col-span-3" />
            </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
              Price
          </Label>
          <Input id="price" placeholder="Price" type="number" onChange={(e) => setPrice(e.target.value)} className="col-span-3" />           
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Addinventory