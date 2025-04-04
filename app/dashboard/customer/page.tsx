import Addcustomer from '@/components/customer/add-customer'
import Getcustomer from '@/components/customer/get-customer'
import React from 'react'

const CustomerPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-2'>
            <h2 className='font-bold text-xl'>Customers</h2>
            <Addcustomer />
        </div>
        <Getcustomer />
    </div>
  )
}

export default CustomerPage