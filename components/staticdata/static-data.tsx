import React from 'react'

import { Button } from "@/components/ui/button"
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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


const StaticData = () => {
  return (
    <Tabs defaultValue="location" className="w-full flex flex-row gap-5">
      <TabsList className="flex flex-col gap-4 h-full w-[150px]">
        <TabsTrigger value="location" className='w-full flex justify-start'>Location</TabsTrigger>
        <TabsTrigger value="category" className='w-full flex justify-start'>Category</TabsTrigger>
        <TabsTrigger value="measurement"  className='w-full flex justify-start'>Measurement</TabsTrigger>
        <TabsTrigger value="user"  className='w-full flex justify-start'>Users</TabsTrigger>
        <TabsTrigger value="stock"  className='w-full flex justify-start'>Stock</TabsTrigger>
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
    </Tabs>
  )
}

export default StaticData