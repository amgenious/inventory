import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Label } from '../ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const Receiptcorrection = () => {
  return (
     <>
       <h2 className='font-bold text-xl pb-3 pl-5'>Receipt Correction</h2>
       <div className='flex flex-col gap-5'>
       <div className='flex items-center justify-center p-5 border-[1px] rounded-md w-full'>
           <div className='flex gap-5 w-2/4'>
               <Input placeholder='Enter Receipt Reference Number' className='w-full'/>
               <Button className='cursor-pointer'><Search/> Search</Button>
           </div>
       </div>
       <div className='p-5 border-[1px] rounded-md w-full'>
           <div className='flex gap-10 w-full'>
               <div className='flex gap-5 w-1/2'>
                   <Label>Reference Number</Label>
                   <Input placeholder='ref.number' className='w-3/4' disabled/>
               </div>
               <div className='flex gap-2 w-1/2'>
                   <Label>Value Date</Label>
                   <Input placeholder='value date' className='w-3/4' disabled/>
               </div>
           </div>
           <div className='flex gap-10 w-full my-8'>
               <div className='flex gap-5 w-1/2'>
                   <Label>Invoice Number</Label>
                   <Input placeholder='invoice number' className='w-3/4' disabled/>
               </div>
               <div className='flex gap-2 w-1/2'>
                   <Label>Invoice Date</Label>
                   <Input placeholder='Invoice date' className='w-3/4' disabled/>
               </div>
           </div>
           <div className='flex gap-10 w-full my-8'>
               <div className='flex gap-5 w-1/2'>
                   <Label>Trans Type</Label>
                   <Input placeholder='Trans Type' className='w-3/4' />
               </div>
               <div className='flex gap-2 w-1/2'>
                   <Label>Trans Code</Label>
                   <Input placeholder='Trans Code' className='w-3/4'/>
               </div>
           </div>
           <div className='flex gap-10 w-full my-8'>
               <div className='flex gap-5 w-1/2'>
                   <Label>Supplier</Label>
                   <Input placeholder='supplier' className='w-3/4' />
               </div>
               <div className='flex gap-2 w-1/2'>
                   <Label>Remarks</Label>
                   <Input placeholder='Remarks' className='w-3/4'/>
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
                           <TableCell>Nails</TableCell>
                           <TableCell>fewpfrog</TableCell>
                           <TableCell>A0</TableCell>
                       </TableRow>
                   </TableBody>
               </Table>
               <div className='flex justify-center items-center gap-2 w-1/2'>
                   <Label>Quantity</Label>
                   <Input placeholder='quantity' type='number' className='w-3/4'/>
               </div>
           </div>
           <Button className='cursor-pointer'>Update</Button>
       </div>
       </div>
       </>
  )
}

export default Receiptcorrection