"use client"
import React,{useState,useEffect} from 'react'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Loader, Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const OpenBalancesPage = () => {
  const [fetching, setFetching] = useState(true)
  const [itemname, setItemname] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [fetchedItems, setItems] = useState<any>([])
  const [prestoreddata, setPreStoredData] = useState<any>([])

  const fetchItems = async()=>{
    setFetching(true)
    const response = await fetch("/api/stock/")
    const data = await response.json()
    setItems(data.stocks)
  
    setFetching(false)
  }
  const addPreStoredData = async()=>{
    let Data = [{id:itemname,itemname,location,quantity}]
    setPreStoredData(Data)
  }

  const handleItemChange = (e:any) => {
    const selectedId = e.target.value;
    const selectedItem = fetchedItems.find((item:any) => item._id === selectedId);
  
    if (selectedItem) {
      setItemname(selectedItem.name);
      setQuantity(selectedItem.quantity || ''); 
      setLocation(selectedItem.location || '');
    }
  };
  useEffect(() => {
    fetchItems()
  }, [])
  return (
    <div className='px-4 lg:px-6'>
      <div className='flex justify-between pb-5'>
        <h2 className='text-xl font-bold'>Opening Balance</h2>
      </div>
      <Separator />
      <div className='flex gap-5 justify-between py-5'>
      <div className='grid grid-cols-3'>
      {
        fetching ? (
          <Skeleton className="h-6 w-full text-center bg-gray-200!"/>
        ):(
          <>
          <div className="flex gap-4 flex-1/3">
    <Label htmlFor="item" className="text-right">
      Item Name
    </Label>
    <select id="item" onChange={handleItemChange} className="col-span-3 border rounded px-2 py-1">
      <option value="">Select an item</option>
      {fetchedItems.map((item:any) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
          </div>
          <div className="flex gap-4 flex-1/3">
    <Label htmlFor="quantity" className="text-right">
      Quantity
    </Label>
    <Input
      id="quantity"
      placeholder="Quantity"
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      disabled
      className="col-span-3"
    />
          </div>
          <div className="flex gap-4 flex-1/3">
    <Label htmlFor="location" className="text-right">
      Location
    </Label>
    <Input
      id="location"
      placeholder="Location"
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      disabled
      className="col-span-3"
    />
          </div>
          </>
          )
        }

        </div>
        <Button onClick={addPreStoredData}><Plus />  Add</Button>
      </div>
      <Separator />
      <div className='py-5'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              prestoreddata.length ? (
                prestoreddata.map((item:any)=>(
                  <TableRow key={item.id}>
                    <TableCell>{item.itemname}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))
              ):(
                <TableRow>
                  <TableCell>No data</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OpenBalancesPage