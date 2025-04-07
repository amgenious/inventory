import Errorcorrectiondata from '@/components/error-corrections/error-correction-data'
import React from 'react'

const ErrorCorrectionsPage = () => {
  return (
    <div className='px-4 lg:px-6'>
      <div className='flex justify-between pb-5'>
        <h2 className='font-bold text-xl'>Error Corrections</h2>
      </div>
      <Errorcorrectiondata />
      </div>
  )
}

export default ErrorCorrectionsPage