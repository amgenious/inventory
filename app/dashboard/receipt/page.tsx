import Addreceipt from '@/components/receipts/addreceipt'
import Getallreceipt from '@/components/receipts/getallreceipt'
import React from 'react'

const ReceiptPage = () => {
  return (
    <div className='px-4 lg:px-6'>
    <div className='flex justify-between w-full pb-2'>
      <h2 className='text-xl font-bold'>Receipts</h2>
      <Addreceipt />
    </div>
    <Getallreceipt/>
    </div>
  )
}

export default ReceiptPage