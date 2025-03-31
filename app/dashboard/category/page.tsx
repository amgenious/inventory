import { AddCategory } from '@/components/category/add-category'
import { Getallcategory } from '@/components/category/getallcategory'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className='px-4 lg:px-6'>
      <div className='flex justify-between w-full pb-2'>
       <h2 className='text-xl font-bold'>Categories</h2>
       <AddCategory />
      </div>
      <Getallcategory />
      </div>
  )
}

export default CategoryPage