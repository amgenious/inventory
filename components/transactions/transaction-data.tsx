import React from 'react'
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs"
import IssuesPage from '@/app/dashboard/issues/page'
import ReceiptPage from '@/app/dashboard/receipt/page'

const Transactiondata = () => {
  return (
    <Tabs defaultValue="Issues" className="w-full flex flex-row gap-5">
    <TabsList className="flex flex-col gap-4 h-full w-[150px]">
      <TabsTrigger value="Issues" className='w-full flex justify-start cursor-pointer'>Issues</TabsTrigger>
      <TabsTrigger value="Receipts" className='w-full flex justify-start cursor-pointer'>Receipts</TabsTrigger>
    </TabsList>
    <TabsContent value="Issues">
      <IssuesPage />
    </TabsContent>
    <TabsContent value="Receipts">
      <ReceiptPage />
    </TabsContent>
  </Tabs>
  )
}

export default Transactiondata