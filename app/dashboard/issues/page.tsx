import Addissues from '@/components/issues/addissues'
import Getallissues from '@/components/issues/getallissues'
import React from 'react'

const IssuesPage = () => {
  return (
    <div className='px-4 lg:px-6'>
      <div className='flex justify-between w-full pb-2'>
        <h2 className='text-xl font-bold'>Issues</h2>
        <Addissues />
      </div>
      <Getallissues />
      </div>
  )
}

export default IssuesPage