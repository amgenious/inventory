import Addmeasurement from '@/components/measurement/add-measurement'
import Getmeasurement from '@/components/measurement/get-measurement'
import React from 'react'

const MeasurementPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-2'>
            <h2 className='font-bold text-xl'>Measurement</h2>
            <Addmeasurement />
        </div>
        <Getmeasurement />
    </div>
  )
}

export default MeasurementPage