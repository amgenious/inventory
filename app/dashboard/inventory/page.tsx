import Addinventory from '@/components/inventory/addinventory'
import Getallinventory from '@/components/inventory/getallinventory'
import React from 'react'

const InventoryPage = () => {
  return (
    <div className='px-4 lg:px-6'>
      <div className='flex justify-between w-full pb-2'>
        <h2 className='text-xl font-bold'>Stock</h2>
        <Addinventory/>
      </div>
      <Getallinventory />
    </div>
  )
}

export default InventoryPage