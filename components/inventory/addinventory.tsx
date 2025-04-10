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
import { Loader2, Plus } from "lucide-react"
import { useState,useEffect } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const Addinventory = () => {
    const [name, setInventoryName] = useState("")
    const [partnumber, setPartnumber] = useState("")
    const [location, setLocation] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")
    const [max_stock, setMaxinstock] = useState(0)
    const [min_stock, setMininstock] = useState(0)
    const [price, setPrice] = useState(0)

    const [fetchedLocations, setFetchedLocations] = useState([])
    const [fetchedCategory, setFetchedCategory] = useState([])
    const [fetchedMeasurement, setFetchedMeasurement] = useState([])

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fetching, setFetching] = useState(false)

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
     async function onSubmit() {
          setIsSubmitting(true)
          
          try {
            const response = await fetch("/api/stock", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name,category,location,measurement,partnumber,max_stock,min_stock,quantity,price}),
            })
      
            if (!response.ok) {
              const error = await response.json()
              throw new Error(error.message || "Failed to create new stock")
            }
      
            toast.success(
               "Success! New Stock has been created.",
            )
          } catch (error) {
            toast.error(
               `Failed to create new stock, Error: ${error}`
            )
          } finally {
            setIsSubmitting(false)
          }
        }
        useEffect(() => {
          fetchParams()
        }, [])
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default"><Plus /> Add Stock</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogDescription>
          Add New Stock here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="name">
            Stock Name
          </Label>
          <Input id="name" placeholder="Stock Name" onChange={(e) => setInventoryName(e.target.value)} className="col-span-3" required/>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="partnumber">
              Part Number
          </Label>
          <Input id="partnumber" placeholder="Part Number" onChange={(e) => setPartnumber(e.target.value)} className="col-span-3" required/>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="flex gap-4">
          <Label htmlFor="location">
              Location
          </Label>
          {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setLocation} value={location}>
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
          <div className="flex gap-4">
          <Label htmlFor="Measurement">
              Measurement
          </Label>
          {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setMeasurement} value={measurement}>
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
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex gap-4">
          <Label htmlFor="quantity" className="text-right">
              Quantity
          </Label>
          <Input id="quantity" placeholder="Quantity" type="number" onChange={(e) => setQuantity(+e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4">
          <Label htmlFor="category" className="text-right">
              Category
          </Label>
          {
            fetching ? (
              <Loader2  className="h-4 w-full animate-spin text-center"/>
            ):(
          <Select onValueChange={setCategory} value={category}>
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
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex gap-4">
          <Label htmlFor="maxinstock" className="text-right">
              Max. in Stock
          </Label>
          <Input id="maxinstock" placeholder="Max in stock" type="number" onChange={(e) => setMaxinstock(+e.target.value)} className="col-span-3" />
            </div>
            <div className="flex gap-4">
          <Label htmlFor="mininstock" className="text-right">
              Min. in stock
          </Label>
          <Input id="mininstock" placeholder="Min in stock" type="number" onChange={(e) => setMininstock(+e.target.value)} className="col-span-3" />
            </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
              Price
          </Label>
          <Input id="price" placeholder="Price" type="number" onChange={(e) => setPrice(+e.target.value)} className="col-span-3" />           
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} onClick={onSubmit} className="cursor-pointer">
        {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Stock"
          )}
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default Addinventory