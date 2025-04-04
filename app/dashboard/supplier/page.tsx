import Addsupplier from '@/components/supplier/add-supplier'
import Getsupplier from '@/components/supplier/get-supplier'
import React from 'react'

const SupplierPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-2'>
            <h2>Suppliers</h2>
            <Addsupplier />
        </div>
        <Getsupplier />
    </div>
  )
}

export default SupplierPage