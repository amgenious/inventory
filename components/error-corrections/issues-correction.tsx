"use client"
import React,{useState} from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, Search } from 'lucide-react'
import { Label } from '../ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { toast } from 'sonner'

const Issuescorrection = () => {
    const [query,setQuery] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchedData, setSearchedData] =useState<any>([])
    const [searched, setSearched] =useState("")

    async function onSubmit(){
        setIsSubmitting(true)
        try{
            const response = await fetch(`/api/issues/search?query=${query}`)
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to search the item")
              }
            const data = await response.json()
            setSearched(data)
            setSearchedData(data.searchedIssue)
        }catch(error){
            toast(`Failed to search. ${error}`)
        }finally{
            setIsSubmitting(false)
        }
    }

  return (
    <>
    <h2 className='font-bold text-xl pb-3 pl-5'>Issue Correction</h2>
    <div className='flex flex-col gap-5'>
    <div className='flex items-center justify-center p-5 border-[1px] rounded-md w-full'>
        <div className='flex gap-5 w-2/4'>
            <Input placeholder='Enter Issue Reference Number' type='number' onChange={(e)=>setQuery(e.target.value)} className='w-full' />
            <Button className='cursor-pointer' disabled={isSubmitting} onClick={onSubmit}>
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
    </div>
    {
        searched ? (
    <div className='p-5 border-[1px] rounded-md w-full'>
        <div className='flex gap-10 w-full'>
            <div className='flex gap-5 w-1/2'>
                <Label>Reference Number</Label>
                <Input placeholder='ref.number' value={searchedData.referencenumber} className='w-3/4' disabled/>
            </div>
            <div className='flex gap-2 w-1/2'>
                <Label>Value Date</Label>
                <Input placeholder='value date' value={searchedData.valuedate} className='w-3/4' disabled/>
            </div>
        </div>
        <div className='flex gap-10 w-full my-8'>
            <div className='flex gap-5 w-1/2'>
                <Label>Trans Type</Label>
                <Input placeholder='Trans Type' className='w-3/4' value={searchedData.transtype} disabled/>
            </div>
            <div className='flex gap-2 w-1/2'>
                <Label>Trans Code</Label>
                <Input placeholder='Trans Code' className='w-3/4' value={searchedData.transcode} disabled/>
            </div>
        </div>
        <div className='flex gap-10 w-full my-8'>
            <div className='flex gap-5 w-1/2'>
                <Label>Customer</Label>
                <Input placeholder='customer' value={searchedData.customer} className='w-3/4' disabled/>
            </div>
            <div className='flex gap-2 w-1/2'>
                <Label>Remarks</Label>
                <Input placeholder='Remarks' className='w-3/4' value={searchedData.remarks} disabled/>
            </div>
        </div>
        <div className='my-10 flex gap-10 w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Part Number</TableHead>
                        <TableHead>Location</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className='text-muted-foreground'>{searchedData.itemname}</TableCell>
                        <TableCell className='text-muted-foreground'>{searchedData.partnumber}</TableCell>
                        <TableCell className='text-muted-foreground'>{searchedData.location}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='flex justify-center items-center gap-2 w-1/2'>
                <Label>Quantity</Label>
                <Input placeholder='quantity' type='number' value={searchedData.quantity} className='w-3/4'disabled/>
            </div>
        </div>
        <Button className='cursor-pointer' disabled>Update</Button>
    </div>
        ):(
            <div className=" w-full text-center italic">
                <p>Search for an issue</p>
            </div>
        )
    }
    </div>
    </>
  )
}

export default Issuescorrection