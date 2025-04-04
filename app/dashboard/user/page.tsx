import Adduser from '@/components/users/add-user'
import Getuser from '@/components/users/get-user'
import React from 'react'

const UsersPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-2'>
            <h2 className='font-bold text-xl'>Users</h2>
            <Adduser />
        </div>
        <Getuser />
    </div>
  )
}

export default UsersPage