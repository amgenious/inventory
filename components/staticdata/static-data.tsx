import React from 'react'
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs"
import CategoryPage from '@/app/dashboard/category/page'
import LocationPage from '@/app/dashboard/location/page'
import MeasurementPage from '@/app/dashboard/measurement/page'
import UsersPage from '@/app/dashboard/user/page'
import InventoryPage from '@/app/dashboard/inventory/page'
import SupplierPage from '@/app/dashboard/supplier/page'
import CustomerPage from '@/app/dashboard/customer/page'


const StaticData = () => {
  return (
    <Tabs defaultValue="location" className="w-full flex flex-row gap-5">
      <TabsList className="flex flex-col gap-4 h-full w-[150px]">
        <TabsTrigger value="location" className='w-full flex justify-start'>Location</TabsTrigger>
        <TabsTrigger value="category" className='w-full flex justify-start'>Category</TabsTrigger>
        <TabsTrigger value="measurement"  className='w-full flex justify-start'>Measurement</TabsTrigger>
        <TabsTrigger value="user"  className='w-full flex justify-start'>Users</TabsTrigger>
        <TabsTrigger value="stock"  className='w-full flex justify-start'>Stock</TabsTrigger>
        <TabsTrigger value="supplier"  className='w-full flex justify-start'>Supplier</TabsTrigger>
        <TabsTrigger value="customer"  className='w-full flex justify-start'>Customer</TabsTrigger>
      </TabsList>
      <TabsContent value="location">
        <LocationPage />
      </TabsContent>
      <TabsContent value="category">
        <CategoryPage />
      </TabsContent>
      <TabsContent value="measurement">
        <MeasurementPage />
      </TabsContent>
      <TabsContent value="user">
       <UsersPage />
      </TabsContent>
      <TabsContent value="stock">
        <InventoryPage />
      </TabsContent>
      <TabsContent value="supplier">
        <SupplierPage />
      </TabsContent>
      <TabsContent value="customer">
        <CustomerPage />
      </TabsContent>
    </Tabs>
  )
}

export default StaticData