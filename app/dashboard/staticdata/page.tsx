import StaticData from '@/components/staticdata/static-data'
import React from 'react'

const StaticDataPage = () => {
  return (
    <div className='px-4 lg:px-6'>
    <div className='flex justify-between w-full pb-5'>
        <h2 className='text-xl font-bold'>Static Data</h2>
    </div>  
    <StaticData />
    </div>
  )
}

export default StaticDataPage