import { Addlocation } from '@/components/location/add-location'
import Getlocation from '@/components/location/get-location'
import React from 'react'

const LocationPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-2'>
            <h2 className='font-bold text-xl'>Location</h2>
            <Addlocation />
        </div>
        <Getlocation />
    </div>
  )
}

export default LocationPage